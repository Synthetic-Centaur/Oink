import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import BudgetCategories from '../../../client/components/dashboard/budget/BudgetCategories'
import GoalConfigurer from '../../../client/components/dashboard/goals/GoalConfigurer'
import GoalList from '../../../client/components/dashboard/goals/GoalList'
import MessageCenter from '../../../client/components/dashboard/goals/MessageCenter'
import InfoModule from '../../../client/components/dashboard/spending/InfoModule'
import DateTransactions from '../../../client/components/dashboard/spending/DateTransactions'
import TransactionMap from '../../../client/components/dashboard/heatmap/TransactionMap'

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

  return {
    props,
    output,
    renderer
  }
}

function MapSetup() {
  let props = {
    updateCluster: expect.createSpy(),
    updateMapDate: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<TransactionMap {...props} />)
  let output = renderer.getRenderOutput()

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

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('container')

      let [ div1, div2, div3 ] = output.props.children

      expect(div1.type).toBe('div')
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

  describe('Transaction map', () => {


    it('should render correctly', (done) => {
      const { output } = MapSetup()
      expect(output.type).toBe('div')
    })
  })
})

describe('Goal Container Components', () => {
  describe('GoalConfigurer Component', () => {

    it('should render correctly', () => {
      const { output, props } = (() => {
        let props = {
          goalPage: expect.createSpy(),
          actions: expect.createSpy(),
          data: { goals: []}
        }

        let renderer = TestUtils.createRenderer()
        renderer.render(<GoalConfigurer {...props} />)
        let output = renderer.getRenderOutput()

        return {
          props,
          output,
          renderer
        }
      })()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('container')
      expect(output.props.children[0].type).toBe('div')
      expect(output.props.children[0].props.className).toBe('row')
      expect(output.props.children[1].type).toBe('div')
      expect(output.props.children[1].props.className).toBe('row')
      expect(output.props.children[2].type).toBe('br')
    })
  })

  describe('MessageCenter Component', () => {
    it('should render correctly', () => {
      const { output, props } = (() => {
        let props = {
          goalPage: expect.createSpy(),
          selectedGoal: expect.createSpy(),
          selectedAvg: expect.createSpy(),
          actions: expect.createSpy(),
          data: { 
            goals: [],
            avgNet: {
              lastMonth: 0,
              lastThree: 0,
              lastSix: 0,
              lastYear: 0
            }}
        }

        let renderer = TestUtils.createRenderer()
        renderer.render(<MessageCenter {...props} />)
        let output = renderer.getRenderOutput()

        return {
          props,
          output,
          renderer
        }
      })()

      expect(output.type).toBe('div')
      expect(output.props.children[0].type).toBe('h5')
      expect(output.props.children[1].type).toBe('table')
    })
  })
  describe('GoalList Component', () => {
    it('should render correctly', () => {
      const { output, props } = (() => {
        let props = {
          goalPage: expect.createSpy(),
          actions: expect.createSpy(),
          selectedGoal: 0,
          switchGoal: expect.createSpy(),
          deleteGoal: expect.createSpy(),
          updateGoal: expect.createSpy(),
          data: { goals: []}
        }

        let renderer = TestUtils.createRenderer()
        renderer.render(<GoalList {...props} />)
        let output = renderer.getRenderOutput()

        return {
          props,
          output,
          renderer
        }
      })()

      expect(output.type.displayName).toBe('SelectableList')
      expect(output.props.children.length).toBe(0)
      expect(output.props.subheader).toBe('Select from your goals')
    })
  })
})

describe('Spending Container Components', () => {
  describe('InfoModule Component', () => {
    it('should render correctly', () => {
      const { output, props } = (() => {
        let props = {
          actions: expect.createSpy(),
          selectedDate: 0,
          selectDate: expect.createSpy(),
          data: { goals: []}
        }

        let renderer = TestUtils.createRenderer()
        renderer.render(<InfoModule {...props} />)
        let output = renderer.getRenderOutput()

        return {
          props,
          output,
          renderer
        }
      })()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('center')
      expect(output.props.children[0].type).toBe('span')
      expect(output.props.children[1].type).toBe('p')
    })
  })
  describe('DateTransactions Component', () => {
    it('should render correctly', () => {
      const { output, props } = (() => {
        let props = {
          selectedDate: 0,
          selectDate: expect.createSpy(),
          data: { goals: [], transactions: []}
        }

        let renderer = TestUtils.createRenderer()
        renderer.render(<DateTransactions {...props} />)
        let output = renderer.getRenderOutput()

        return {
          props,
          output,
          renderer
        }
      })()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('container')
      expect(output.props.children.length).toBe(2)
    })
  })
})
