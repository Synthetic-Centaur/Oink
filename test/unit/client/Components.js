import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Home from '../client/containers/home'

function setup() {
  let props = {
    actions.postBudget: expect.createSpy()
    actions.numberValidation: expect.createSpy()
    actions.categoryValidation: expect.createSpy()
    actions.authLogout: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Home {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Home Container Components', () => {
  describe('Budget Categories', () => {

  })

  describe('Pie Chart', () => {

  }

  describe('Nav Bar', () => {

  })
})