import React, { Component, PropTypes } from 'react'

class InfoModule extends Component {

  render() {
    const { data, selectedDate } = this.props
    return (
      <ul className="center">
        <li>Click on any date to see that day's transactions</li>
        <li>Click and drag a rectangle to zoom in</li>
        <li> While zoomed, hold shift and click and drag to pan</li>
      </ul>
    )
  }
}

export default InfoModule