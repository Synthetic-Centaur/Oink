import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class WelcomeMessage extends React.Component {
  render() {
    return (
      <div>
        <h5 className="welcome-message">Welcome to Oink! I see that you don't currently have any budgets set up. Please create a budget on the right.</h5>
      </div>
    )
  }
}

export default WelcomeMessage
