import {default as React, Component} from 'react'

import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'
/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 *
 * Add <script src='https://maps.googleapis.com/maps/api/js'></script> to your HTML to provide google.maps reference
 */
export default class GoogleHeatMap extends Component {
  /*
   * 1. Create a component that wraps all your map sub-components.
   */
  render() {
    /*
     * 2. Render GoogleMap component with containerProps
     */
    return (
      <section stye={{height: '100%'}}>
        <GoogleMapLoader
          containerElement={
            <div style={{height: '800px', width: '80%'}}/>
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => (this._googleMapComponent = map) && console.log('_googlemapcomp: ', this._googleMapComponent)}
              defaultZoom={12}
              defaultCenter={{lat: 37.7833, lng: -122.4167}} />
          } />
      </section>
    )
  }
}