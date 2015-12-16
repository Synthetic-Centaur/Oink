import React, { Component, PropTypes } from 'react'

class ComponentPlayground extends Component {

  render() {
    Component = this.props.currentComponent.component

    return (
      <Component  />
    )

  }
}

ComponentPlayground.PropTypes = {
  data: PropTypes.obj,
  homePage: PropTypes.obj,
  actions: PropTypes.obj,
  currentComponent: PropTypes.obj
}

export default ComponentPlayground
