import react, { Component, PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
import _ from 'underscore'
const style = {width: 400, margin: 50};
let map
let markers
let overlays
let geocoder
let TransactionMarker

let categories = {
  'Bank Fees': 'bank',
  'Food and Drink': 'restaurant',
  Healthcare: 'hospital',
  Recreation: 'pitch',
  Shops: 'shop',
  Service: 'logging',
  Transfer: 'bank',
  Travel: 'airport'
}

export default class TransactionMap extends Component {

  componentDidUpdate() {

  }

  render() {
    const { categories, currentChildren, mapDate, currentAddress, transactions } = this.props

    let listItems = this.formatPurchases(currentChildren, currentAddress, mapDate, transactions)
    let header = this.formatHeader(mapDate, transactions)

    return (
      <div className="container">
        <div className="sixteen columns" style={{height: '80px'}}>
          { header }
        </div>
        <div className="row" style={{width: '100%'}}>
          <div id="map" className="eight columns" style={{height: '700px'}} />
          <List className="four columns" style={{height: '700px'}} >
            { listItems }
          </List>
        </div>
        <Slider ref="slider" description="testing" name = "timeSlider" defaultValue={1} onDragStop={this.sliderValue.bind(this)}/>
        <Slider ref="slider2" name = "slider2" defaultValue={0} onDragStop={this.sliderValue.bind(this)}/>
      </div>
    )
  }

  componentDidMount() {
    const { transactions, updateMapDate } = this.props
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWFja2VybWFuMDUwIiwiYSI6ImNpaW94NmswbDAxZ3V0cmtuZ3RmbzlyZWEifQ.5o1kSPi-0DNLrs2iyYpEpg'
    map = L.mapbox.map('map', 'mapbox.streets').setView([37.7833, -122.4167], 12)
    overlays = L.layerGroup().addTo(map)

    geocoder = new google.maps.Geocoder
    TransactionMarker = L.Marker.extend({
      options: {
        price: 0
      }
    })

    updateMapDate({startDate: transactions[0].date.toString().slice(0, 16), endDate: transactions[transactions.length - 1].date.toString().slice(0, 16)})
    this.addMarkers(transactions)

  }

  formatHeader(mapDate, transactions) {
    let startDate
    let endDate
    if (Object.keys(mapDate).length === 0) {
      startDate = transactions[0].date.toString().slice(0, 16)
      endDate = transactions[transactions.length - 1].date.toString().slice(0, 16)
    } else {
      startDate = mapDate.startDate
      endDate = mapDate.endDate
    }
    // console.log(mapDate.startDate, mapDate.endDate, transactions[0].date.toString().slice(0, 16))
    return <span className="four columns offset-by-four" style={{color: 'white'}}>Showing transactions from {startDate} to {endDate}</span>
  }

  formatPurchases(currentChildren, currentAddress, mapDate, transactions) {
    let purchases = []
    for (var key in currentChildren) {
      purchases.push([key, currentChildren[key]])
    }

    purchases.sort((a, b) => {
      return b[1].visits - a[1].visits
    })

    let listItems = purchases.map((purchase) => {
      return (
        <ListItem
          primaryText={purchase[0] + ' - ' + purchase[1].visits +  ' purchases'}
          secondaryText={'$' + purchase[1].totalSpent + ' spent'}
          onClick={this.show.bind(this, 'pop')}/>
      )
    })

    if (currentAddress) {
      listItems.unshift(<ListItem primaryText={'Your top purchases near ' + currentAddress} secondaryText={'Range: ' + mapDate.startDate + ' - ' + mapDate.endDate}/>)
    } else {
      listItems.unshift(<ListItem primaryText={'Select a marker to view your purchases'} />)
    }

    listItems = listItems.slice(0, 9)
    return listItems
  }

  sliderValue(e) {
    const { transactions, updateMapDate } = this.props
    let slider1 = this.refs.slider.getValue()
    let slider2 = this.refs.slider2.getValue()
    let minIndex = Math.floor(transactions.length * Math.min(slider1, slider2))
    let maxIndex = Math.floor(transactions.length * Math.max(slider1, slider2))
    console.log(minIndex, maxIndex)
    // let index = Math.floor(transactions.length * this.refs.slider.getValue())
    let filteredTransactions = transactions.slice(minIndex, maxIndex)
    let startDate = filteredTransactions[0].date.toString().slice(0, 16)
    let endDate = filteredTransactions[filteredTransactions.length - 1].date.toString().slice(0, 16)
    updateMapDate({startDate: startDate, endDate: endDate})
    this.addMarkers(filteredTransactions)
  }

  addMarkers(transactions) {
    overlays.clearLayers()
    markers = new L.MarkerClusterGroup({zoomToBoundsOnClick: false}).addTo(overlays);

    markers.on('clusterclick', this.clusterChildren.bind(this))

    _.each(_.filter(transactions, (t) => {
      return t.latitude !== '0.00' && t.longitude !== '0.00'
    }), (t) => {
      let title = t.store_name
      let price = t.amount
      let symbol = (t.description in categories) ? categories[t.description] : 'marker-stroked'
      let marker = new TransactionMarker(new L.LatLng(parseFloat(t.latitude), parseFloat(t.longitude)), {
        icon: L.mapbox.marker.icon({'marker-symbol': symbol, 'marker-color': '0044FF'}),
        title: title,
        price: price
      })
      marker.bindPopup(title)
      markers.addLayer(marker)
    })

    // map.addLayer(markers);
  }

  markerFilter(event) {
    let value = event.target.value
    let symbol = (value in categories) ? categories[value] : 'marker-stroked'
    map.featureLayer.setFilter((f) => {
      return f.properties['marker-symbol'] === symbol
    })
    console.log('should have set filter')
    return false
  }

  clusterChildren(a) {
    const { updateCluster, updateMapDate, updateAddress } = this.props

    //get all markers contained within cluster
    let children = a.layer.getAllChildMarkers()

    //get coordinates of cluster bounding box
    let bounds = a.layer.getBounds()

    //hash number of visits for each transaction
    let hash = {}
    _.each(children, (child) => {
      let title = child.options.title
      let transactionSum  = Math.floor(child.options.price)
      if (title in hash) {
        hash[title].visits++
        hash[title].totalSpent += transactionSum
      } else {
        hash[title] = {visits: 1, totalSpent: transactionSum}
      }
    })

    //get address of cluster marker from google geocode
    let latlng = {lat: parseFloat(a.layer._cLatLng.lat), lng: parseFloat(a.layer._cLatLng.lng)}
    geocoder.geocode({location: latlng}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let address = results[1].formatted_address.replace(/-/g, '').replace(/[0-9]/g, '')

          //update transactions and address on state
          updateCluster({markers: hash, address: address})
        }
      }
    })
  }

  show(key, e) {
    console.log('you just clicked on some shit yo!!')
    console.log(this)
  }
}
