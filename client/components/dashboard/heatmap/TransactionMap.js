import react, { Component, PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import { Paper, DatePicker } from 'material-ui'
import _ from 'underscore'
import moment from 'moment'
let map
let markers
let overlays
let geocoder
let TransactionMarker

// Assigns each category a symbol type for its marker
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

  // Ensures that class receives new state on update
  componentDidUpdate() {

  }

  render() {
    const { categories, currentChildren, mapDate, currentAddress, transactions } = this.props

    // Formats each purchase into a Material-UI List Item
    let listItems = this.formatPurchases(currentChildren, currentAddress, mapDate, transactions)

    // Formats header to list start date and end date of transactions
    let header = this.formatHeader(mapDate, transactions)

    // Renders class with header, map, date picker, and transaction list
    return (
      <div className="container">
        <div className="center" style={{height: '80px'}}>
          { header }
        </div>
        <div className="row" style={{width: '100%'}}>
          <div id="map" 
            className="eight columns" 
            style={{height: '700px'}} 
          />
          <Paper zDepth={1} rounded={false} className="four columns" style={{height: '700px'}}>
            <div className="row">
              <DatePicker
                className="center"
                fullWidth={true}
                ref="startDate"
                autoOk={true}
                hintText="Select a start date"
                onChange={this.handleDates.bind(this)} 
              />
            </div>
            <div className="row">
              <DatePicker
                className="center"
                fullWidth={true}
                ref="endDate"
                autoOk={true}
                hintText="Select an end date"
                onChange={this.handleDates.bind(this)} 
              />
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

  // Initializes mapbox after component has mounted
  componentDidMount() {
    const { transactions, updateMapDate, accessToken } = this.props

    // Creates mapbox using access token, and assign it to div with classname 'map'
    L.mapbox.accessToken = accessToken
    map = L.mapbox.map('map', 'mapbox.streets', {zoomControl: false}).setView([37.7833, -122.4167], 12)

    // Creates overlay to store and display markers
    overlays = L.layerGroup().addTo(map)

    // Sets Zoom controller to top right of map
    new L.Control.Zoom({ position: 'topright' }).addTo(map);

    // Extends marker class to have price property, enabling storage of transaction cost data
    TransactionMarker = L.Marker.extend({
      options: {
        price: 0
      }
    })

    // Initializes google geocoder to convert lat/lng to nearest street address
    geocoder = new google.maps.Geocoder

    // Sets start date and end date of transactions on state
    updateMapDate({startDate: moment(transactions[transactions.length - 1].date).format("dddd, MMMM Do YYYY"), endDate: moment(transactions[0].date).format("dddd, MMMM Do YYYY")})

    // Creates a marker for each transaction
    this.addMarkers(transactions)

  }

  // Formats header from date object to string with format dddd, MMMM, Do YYYY and creates span
  formatHeader(mapDate, transactions) {
    let startDate
    let endDate
    if (Object.keys(mapDate).length === 0) {
      startDate = moment(transactions[transactions.length - 1].date).format("dddd, MMMM Do YYYY")
      endDate = moment(transactions[0].date).format("dddd, MMMM Do YYYY")
    } else {
      startDate = mapDate.startDate
      endDate = mapDate.endDate
    }

    return <span className="four columns offset-by-four" style={{color: 'white'}}>Your transactions from {startDate} to {endDate}</span>
  }

  // Sorts transactions according to number of visits and formats each transaction as a Material-UI List Item
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
      listItems.unshift(<ListItem primaryText={'Your top purchases near ' + currentAddress} />)
    } else {
      listItems.unshift(<ListItem primaryText={'Select a marker to view your purchases'} />)
    }

    listItems = listItems.slice(0, 8)
    return listItems
  }

  // Filters transactions and markers according to user selected dates and updates dates on state
  handleDates(e) {
    const { transactions, updateMapDate } = this.props
    let startDate = this.refs.startDate.getDate() || transactions[transactions.length - 1].date
    let endDate = this.refs.endDate.getDate() || transactions[0].date
    if (startDate && endDate) {
      let filteredTransactions = _.filter(transactions, (transaction) => {
        return new Date(transaction.date) <= new Date(endDate) && new Date(transaction.date) >= new Date(startDate)
      })
      startDate = moment(startDate).format("dddd, MMMM Do YYYY")
      endDate = moment(endDate).format("dddd, MMMM Do YYYY")
      updateMapDate({startDate: startDate, endDate: endDate})
      this.addMarkers(filteredTransactions)
    }
  }

  // Creates a new marker for each transaction and adds marker to mapbox overlay
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

  }

  // Gets all children of clicked cluster as well as geolocation address of cluster and updates state with data
  clusterChildren(a) {
    const { updateCluster, updateMapDate, updateAddress } = this.props

    // Gets all markers contained within cluster
    let children = a.layer.getAllChildMarkers()

    // Gets coordinates of cluster bounding box
    let bounds = a.layer.getBounds()

    // Hashs number of visits and price for each transaction
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

    // Gets address of cluster marker from google geocode
    let latlng = {lat: parseFloat(a.layer._cLatLng.lat), lng: parseFloat(a.layer._cLatLng.lng)}
    geocoder.geocode({location: latlng}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let address = results[1].formatted_address.replace(/-/g, '').replace(/[0-9]/g, '')

          // Updates transactions and address on state
          updateCluster({markers: hash, address: address})
        }
      }
    })
  }

}
