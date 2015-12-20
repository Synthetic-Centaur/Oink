import {default as React, Component} from 'react'
import ReactDOM from 'react-dom'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'
import Slider from 'material-ui/lib/slider'
import _ from 'underscore'

// import HeatMapOverlay from 'react-map-gl-heatmap-overlay'

export default class GoogleHeatMap extends Component {


  sliderValue(e) {
    const { transactions } = this.props
    console.log(this.refs.slider.getValue())
    //i will want a way to set the very first date of users transactions to 0, the most recent date to 1, and then filter
    // let filteredLocations = _.filter(transactions, (transaction) => {
    //   return transaction.date < slider
    // })
    //map these all to be google map lat lng data
    //then render new heat map with just this data
    //this.overlay(filteredLocations)
  }

  render () {

    return (
      <div className="map">
        <div ref="mapCanvas" style={{height: "800px", width: "100%", padding: "10px"}}/>
        <Slider ref="slider" name = "timeSlider" defaultValue={1} onChange={this.sliderValue.bind(this)}/>
      </div>
    );
    
  }


  componentDidMount() {
    const { transactions } = this.props

    let map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.mapCanvas), {
      zoom: 12,
      center: {lat: 37.7833, lng: -122.4167},
      mapTypeId: google.maps.MapTypeId.SATELLITE
    })

    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(transactions),
      map: map
    })

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP)
  }


  overlay(transactions) {
    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: transactions,
      map: map
    })
  }

  getPoints (transactions) {

    return _.map(_.filter(transactions, (t) => {
      return t.latitude !== '0.00' && t.longitude !== '0.00'
    }), (t) => {
      return new google.maps.LatLng(parseFloat(t.latitude), parseFloat(t.longitude))
    })

  }
}
