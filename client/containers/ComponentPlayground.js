import React, { Component, PropTypes } from 'react'

class ComponentPlayground extends Component {

  render() {

    const { props, state } = this
    let Component = props.currentComponent.component

    return (
      <Component  
        data = { props.data }/>
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
