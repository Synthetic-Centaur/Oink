import React, { Component, PropTypes } from 'react'

export default class LoadingIndicator extends Component {
  render() {
    const { isLoading, firstPull } = this.props
    return (
      <div>
      {
        isLoading ?
          (<div className="loading-indicator">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>)
        :
        firstPull ?
          (<div className="loading-indicator first-pull">
            <h1>Please wait just a few seconds while we pull your bank information.</h1>
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>)
        :
        null
      }
      </div>
    )
  }
}
