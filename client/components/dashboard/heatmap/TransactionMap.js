import react, { Component, PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'
import _ from 'underscore'
let map, markers, overlays


export default class TransactionMap extends Component {
  render() {
    return (
      <div className="container">
        <div id="map" style={{height: "800px", width: "100%", padding: "10px"}} />
        <Slider ref="slider" name = "timeSlider" defaultValue={0} onDragStop={this.sliderValue.bind(this)}/>
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

    L.mapbox.featureLayer('')
  }

  sliderValue(e) {
    const { transactions } = this.props
    let index = Math.floor(transactions.length * this.refs.slider.getValue())
    let filteredTransactions = transactions.slice(0, index)
    this.addMarkers(filteredTransactions)
  }

  addMarkers(transactions) {
    overlays.clearLayers()
    markers = new L.MarkerClusterGroup().addTo(overlays);

    _.each(_.filter(transactions, (t) => {
      return t.latitude !== "0.00" && t.longitude !== "0.00"
    }), (t) => {
      let title = t.store_name
      let marker = L.marker(new L.LatLng(parseFloat(t.latitude), parseFloat(t.longitude)), {
        icon: L.mapbox.marker.icon({'marker-symbol': 'restaurant', 'marker-color': '0044FF'}),
        title: title
      })
      marker.bindPopup(title)
      markers.addLayer(marker)
    })

    // map.addLayer(markers);
  }
}
