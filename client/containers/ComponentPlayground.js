import React, { Component, PropTypes } from 'react'

class ComponentPlayground extends Component {

  render() {

    const { props, state } = this,
      Component = props.currentComponent.component

    return (
      <Component 
        // data = { props.data }
        // postBudget={ props.actions.postBudget }
        // numberValidation={ props.actions.numberValidation } 
        // categoryValidation={ props.actions.categoryValidation }
        // numberError={ props.homePage.numberError }
        // categoryError={ props.homePage.categoryError }
        // category={ props.homePage.category } 
      />
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