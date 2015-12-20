import {default as React, Component} from 'react'
import ReactDOM from 'react-dom'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'
import Slider from 'material-ui/lib/slider'
import _ from 'underscore'

// import HeatMapOverlay from 'react-map-gl-heatmap-overlay'

export default class GoogleHeatMap extends Component {

  render() {
    return (
      <div className='map'>
        <div ref='mapCanvas' style={{height: '800px', width: '100%'}}/>
        <Slider name = 'timeSlider'/>
      </div>
    )
  }

  overlay(map) {
    console.log('in overlay', map)
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

  getPoints(transactions) {

    return _.map(_.filter(transactions, (t) => {
      return t.latitude !== '0.00' && t.longitude !== '0.00'
    }), (t) => {
      return new google.maps.LatLng(parseFloat(t.latitude), parseFloat(t.longitude))
    })

  }
}
