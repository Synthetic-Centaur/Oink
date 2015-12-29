import React, { Component, PropTypes } from 'react'

export default class LoadingIndicator extends Component {
  render() {
    const { isLoading } = this.props
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
        null
      }
      </div>
    )
  }
}
