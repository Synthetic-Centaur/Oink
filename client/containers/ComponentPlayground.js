// ## COMPONENT CONTAINER

import React, { Component, PropTypes } from 'react'

// Component playground receives and renders the current component that has been selected on the nav bar and set on state
class ComponentPlayground extends Component {

  render() {

    const { props } = this
    let Component = props.currentComponent.component

    return (
      <Component />
    )

  }
}

ComponentPlayground.PropTypes = {
  currentComponent: PropTypes.obj
}

export default ComponentPlayground
