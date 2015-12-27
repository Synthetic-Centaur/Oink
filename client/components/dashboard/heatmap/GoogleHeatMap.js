import {default as React, Component} from 'react'
import ReactDOM from 'react-dom'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'
import Slider from 'material-ui/lib/slider'
import RaisedButton from 'material-ui/lib/raised-button'
import _ from 'underscore'
let map, heatmap

export default class GoogleHeatMap extends Component {

  sliderValue(e) {
    const { transactions } = this.props
    let index = Math.floor(transactions.length * this.refs.slider.getValue())
    let filteredTransactions = transactions.slice(0, index)
    this.overlay(filteredTransactions)
  }

  render () {

    return (
      <div className="container">
        <div ref="mapCanvas" style={{height: "800px", width: "100%", padding: "10px"}}/>
        <Slider ref="slider" name = "timeSlider" defaultValue={0} onDragStop={this.sliderValue.bind(this)}/>
      </div>
    );

  }

  componentDidMount() {
    const { transactions } = this.props

    map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.mapCanvas), {
      zoom: 12,
      center: {lat: 37.7833, lng: -122.4167},
      mapTypeId: google.maps.MapTypeId.SATELLITE
    })

    let dataPoints = this.getPoints(transactions)
    console.log(dataPoints.length)

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: dataPoints,
      map: map
    })

    heatmap.setOptions({
      maxIntensity: 10, //The maximum intensity of the heatmap
      opacity: 0.8, //The opacity of the heatmap
      radius: 12, //The radius of influence for each data point, in pixels.
      scaleRadius: true,
      dissipating: true
    });

    map.data.addListener('mouseover', function(event) {
      console.log("we're hoverin!")
    })

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP)
  }


  overlay(transactions) {

    heatmap.setMap(heatmap.getMap() ? null : map);

    console.log(transactions[transactions.length - 1].date)
    
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(transactions),
      map: map
    })

    heatmap.setOptions({
      maxIntensity: 10, //The maximum intensity of the heatmap
      opacity: 0.8, //The opacity of the heatmap
      radius: 12, //The radius of influence for each data point, in pixels.
      scaleRadius: true,
      dissipating: true
    });

  }

  getPoints (transactions) {

    let filtered = _.filter(transactions, (t) => {
      return t.latitude !== "0.00" && t.longitude !== "0.00"
    })

    let heatMapPoints =  _.map(_.filter(transactions, (t) => {
      return t.latitude !== "0.00" && t.longitude !== "0.00"
    }), (t) => {
      return new google.maps.LatLng(parseFloat(t.latitude), parseFloat(t.longitude))
    })

    return heatMapPoints
  }
}
