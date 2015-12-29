import react, { Component, PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import _ from 'underscore'
let map, markers, overlays, geocoder

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

  componentDidUpdate(){

  }

  render() {
    const { categories, currentChildren, mapDate, currentAddress } = this.props

    let purchases = []
    for (var key in currentChildren) {
      purchases.push([key, currentChildren[key]])
    }
    purchases.sort((a,b) => {
      return b[1]-a[1]
    })
    console.log("sorted purchases------------->", purchases)

    let listItems = purchases.map((purchase) => {
      return (
        <ListItem
          primaryText={purchase[0]}
          secondaryText={purchase[1] + " visits"} />
      )
    })

    if (currentAddress) {
      listItems.unshift(<ListItem primaryText={"Your top purchases near " + currentAddress} />)
    } else {
      listItems.unshift(<ListItem primaryText={"Select a marker to view your purchases"} />)
    }
    listItems = listItems.slice(0,9)

    let menuItems = [{ payload: 'Choose a category', text: 'Choose a category'}]

    if (categories !== undefined) {
      let categoryItems = categories.map((category) => {
        return {payload: category, text: category}
      })
      menuItems = menuItems.concat(categoryItems)
    }

    return (
      <div className="container">
        <div className="sixteen columns" style={{height: "80px"}}>
          <span className="four columns offset-by-four" style={{color: 'white'}}>Showing transactions before {mapDate}</span>
        </div>
        <div className="row" style={{width: "100%"}}>
          <div id="map" className="eight columns" style={{height: "700px"}} />
          <List className="four columns" >
            { listItems }
          </List>
        </div>
        <Slider ref="slider" name = "timeSlider" defaultValue={1} onDragStop={this.sliderValue.bind(this)}/>
      </div>
    )
  }

  componentDidMount() {
    const { transactions, updateMapDate } = this.props
    L.mapbox.accessToken = "pk.eyJ1IjoiYWFja2VybWFuMDUwIiwiYSI6ImNpaW94NmswbDAxZ3V0cmtuZ3RmbzlyZWEifQ.5o1kSPi-0DNLrs2iyYpEpg"
    map = L.mapbox.map('map', 'mapbox.streets').setView([37.7833, -122.4167], 12);
    overlays = L.layerGroup().addTo(map)
    geocoder = new google.maps.Geocoder

    updateMapDate(transactions[transactions.length - 1].date.toString().slice(0,16))
    this.addMarkers(transactions)

  }

  sliderValue(e) {
    const { transactions, updateMapDate } = this.props
    let index = Math.floor(transactions.length * this.refs.slider.getValue())
    let filteredTransactions = transactions.slice(0, index)
    updateMapDate(filteredTransactions[filteredTransactions.length - 1].date.toString().slice(0,16))
    this.addMarkers(filteredTransactions)
  }

  addMarkers(transactions) {
    overlays.clearLayers()
    markers = new L.MarkerClusterGroup({zoomToBoundsOnClick: false}).addTo(overlays);

    markers.on('clusterclick', this.clusterChildren.bind(this));

    _.each(_.filter(transactions, (t) => {
      return t.latitude !== "0.00" && t.longitude !== "0.00"
    }), (t) => {
      let title = t.store_name
      let symbol = (t.description in categories) ? categories[t.description] : 'marker-stroked'
      let marker = L.marker(new L.LatLng(parseFloat(t.latitude), parseFloat(t.longitude)), {
        icon: L.mapbox.marker.icon({'marker-symbol': symbol, 'marker-color': '0044FF'}),
        title: title
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
    console.log("Lat long of cluster marker ----------->", a.layer._cLatLng)
    let hash = {}
    //hash number of visits for each transaction
    _.each(children, (child) => {
      (child.options.title in hash) ? hash[child.options.title] += 1 : hash[child.options.title] = 1
    })
    //update hash on state
    let latlng = {lat: parseFloat(a.layer._cLatLng.lat), lng: parseFloat(a.layer._cLatLng.lng)}
    geocoder.geocode({'location': latlng}, (results, status) => {
      if(status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let address = results[1].formatted_address.replace(/-/g, '').replace(/[0-9]/g, '')
          updateCluster({markers: hash, address: address})
        }
      }
    })
  }
}
