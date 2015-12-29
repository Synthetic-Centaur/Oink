import react, { Component, PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import _ from 'underscore'
let map, markers, overlays

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
    const { categories } = this.props
    let menuItems = [{ payload: 'Choose a category', text: 'Choose a category'}]

    if (categories !== undefined) {
      let categoryItems = categories.map((category) => {
        return {payload: category, text: category}
      })
      menuItems = menuItems.concat(categoryItems)
    }

    return (
      <div className="container">
        <DropDownMenu 
          className="category-dropdown"
          ref="category"
          menuItems = {menuItems}
          onChange={this.markerFilter.bind(this)}/>
        <div className="row">
          <div id="map" style={{height: "700px", width: "70%", padding: "10px"}} />
          <List>
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent mail" />
            <ListItem primaryText="Drafts" />
            <ListItem primaryText="Inbox" />
          </List>
        </div>
        <Slider ref="slider" name = "timeSlider" defaultValue={0} onChange={this.sliderValue.bind(this)}/>
      </div>
    )
  }

  componentDidMount() {
    const { transactions } = this.props
    console.log(transactions)
    L.mapbox.accessToken = "pk.eyJ1IjoiYWFja2VybWFuMDUwIiwiYSI6ImNpaW94NmswbDAxZ3V0cmtuZ3RmbzlyZWEifQ.5o1kSPi-0DNLrs2iyYpEpg"
    map = L.mapbox.map('map', 'mapbox.streets').setView([37.7833, -122.4167], 12);
    overlays = L.layerGroup().addTo(map)

    this.addMarkers(transactions)

  }

  sliderValue(e) {
    const { transactions } = this.props
    let index = Math.floor(transactions.length * this.refs.slider.getValue())
    let filteredTransactions = transactions.slice(0, index)
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
    const { updateChildren } = this.props
    console.log(updateChildren)
    let children = a.layer.getAllChildMarkers()
    let bounds = a.layer.getBounds()
    let hash = {}
    _.each(children, (child) => {
      (child.options.title in hash) ? hash[child.options.title] += 1 : hash[child.options.title] = 1
    })
    console.log(hash)
  }
}
