import react, { Component, PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import { Paper, DatePicker } from 'material-ui'
import _ from 'underscore'
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
        <div className="center" style={{height: '80px'}}>
          { header }
        </div>
        <div className="row" style={{width: '100%'}}>
          <div id="map" className="eight columns" style={{height: '700px'}} />
          <Paper zDepth={1} rounded={false} className="four columns" style={{height: '700px'}}>
            <div className="row">
              <DatePicker
                className="center"
                fullWidth={true}
                ref="startDate"
                autoOk={true}
                hintText="Select a start date"
                onChange={this.handleDates.bind(this)} />
            </div>
            <div className="row">
              <DatePicker
                className="center"
                fullWidth={true}
                ref="endDate"
                autoOk={true}
                hintText="Select an end date"
                onChange={this.handleDates.bind(this)} />
            </div>
            <div className ="row" style={{height: '604px'}}>
              <List>
                { listItems }
              </List>
            </div>
          </Paper>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { transactions, updateMapDate, accessToken } = this.props
    L.mapbox.accessToken = accessToken
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

    return <span className="four columns offset-by-four" style={{color: 'white'}}>Your transactions from {startDate} to {endDate}</span>
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
      let plural = purchase[1].visits > 1 ? ' purchases' : ' purchase'
      return (
        <ListItem
          primaryText={purchase[0] + ' - ' + purchase[1].visits +  plural}
          secondaryText={'$' + purchase[1].totalSpent + ' spent'} />
      )
    })

    if (currentAddress) {
      listItems.unshift(<ListItem primaryText={'Your top purchases near ' + currentAddress} secondaryText={'Range: ' + mapDate.startDate + ' - ' + mapDate.endDate}/>)
    } else {
      listItems.unshift(<ListItem primaryText={'Select a marker to view your purchases'} />)
    }

    listItems = listItems.slice(0, 8)
    return listItems
  }

  handleDates(e) {
    const { transactions, updateMapDate } = this.props
    let startDate = this.refs.startDate.getDate() || transactions[0].date
    let endDate = this.refs.endDate.getDate() || transactions[transactions.length - 1].date
    if (startDate && endDate) {
      let filteredTransactions = _.filter(transactions, (transaction) => {
        return transaction.date <= endDate && transaction.date >= startDate
      })
      startDate = startDate === undefined ? startDate : startDate.toString().slice(0, 15)
      endDate = endDate === undefined ? endDate : endDate.toString().slice(0, 15)
      console.log(startDate, endDate, filteredTransactions)
      updateMapDate({startDate: startDate, endDate: endDate})
      this.addMarkers(filteredTransactions)
    }
  }

  addMarkers(transactions) {
    overlays.clearLayers()
    markers = new L.MarkerClusterGroup({zoomToBoundsOnClick: false}).addTo(overlays)

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

}
