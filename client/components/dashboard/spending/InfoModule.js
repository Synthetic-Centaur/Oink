import React, { Component, PropTypes } from 'react'

class InfoModule extends Component {

  render() {
    const { data, selectedDate } = this.props
    return (
      <div className = 'center'>
        <span>Click on any date to see that day's transactions || Click and drag a rectangle to zoom in</span>
        <p> While zoomed, hold shift and click and drag to pan</p>
      </div>
    )
  }
}

export default InfoModule