import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import BudgetCategories from '../../../client/components/home/BudgetCategories'

function setup() {
  let props = {
    postBudget: expect.createSpy(),
    numberValidation: expect.createSpy(),
    categoryValidation: expect.createSpy(),
    data: {categories: []}
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<BudgetCategories {...props} />)
  let output = renderer.getRenderOutput()

  console.log('is this working??', output)
  return {
    props,
    output,
    renderer
  }
}

describe('Home Container Components', () => {
  describe('Budget Categories', () => {
    it('should render correctly', () => {
      const { output } = setup()

      expect(output.type).toBe('form')
      expect(output.props.className).toBe('u-pull-right')

      let [ div1, div2, div3 ] = output.props.children

      expect(div1.type).toBe('div')
      console.log(div1.props.children)
      expect(div1.props.children.type.displayName).toBe('DropDownMenu')

      expect(div2.type).toBe('div')
      expect(div2.props.children.type.displayName).toBe('TextField')

      expect(div3.type).toBe('div')
      expect(div3.props.children.type.displayName).toBe('RaisedButton')
    })

    it('should call numberValidation on change', () => {
      const { output, props } = setup()
    })
  })

  // describe('Pie Chart', () => {

  // }

  // describe('Nav Bar', () => {

  // })
})