import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import { Paper } from 'material-ui'
import SpendingChart from '../components/dashboard/spending/SpendingChart.js'
import DateTransactions from '../components/dashboard/spending/DateTransactions.js'
import InfoModule from '../components/dashboard/spending/InfoModule.js'
import { selectDate } from '../actions/actions'

class Spending extends Component {

  render() {
    const { actions, spendingPage, data } = this.props
    return (
      <div className = 'container info'>
        <div className = 'row'>
         <div className= 'twelve columns'>
           <InfoModule
              data={ data }
              selectedDate={spendingPage.selectedDate}
              selectDate = { actions.selectDate }/>
          </div>
        </div>
        <div className = 'row'>
          <SpendingChart
              data= { data }
              selectedDate={spendingPage.selectedDate}
              selectDate = { actions.selectDate }/>
        </div>
          {spendingPage.selectedDate === null ? <div/> : <div>
            <br/>
            <Paper zDepth={1} rounded={false} className ='twelve columns'>
              <DateTransactions
                data={ data }
                selectedDate={ spendingPage.selectedDate }
                selectDate = { actions.selectDate }/>
            
            </Paper>
          </div> }
      </div>
    )
  }
}

Spending.propTypes = {

}

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    spendingPage: state.spendingPage
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      selectDate
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spending)