import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts'
import chartConfig from './config/chartConfig'

class PieChart extends Component {

  // Making sure pie chart does not refresh whenever input form is changed
  shouldComponentUpdate(nextProps) {
    if (this.props.data.budgets && nextProps.data.budgets) {
      return this.props.data.budgets.length !== nextProps.data.budgets.length
    } else {
      return true
    }
  }

  //Dynamically change high chart as user adds new budget categories
  componentDidMount() {
    //here we can access high charts and change data accordingly
  }

  render() {
    const { data } = this.props
    let config = data.budgets !== undefined ? chartConfig(data.budgets) : null

    return (
        <div>
          {
            data.budgets !== undefined
            ?
            <ReactHighCharts config={config} ref="chart" />
            :
            null 
          }
        </div>
      )
  }

}

export default PieChart
