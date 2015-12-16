import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import SettingsForm from '../components/settings/SettingsForm'
import SettingsModal from '../components/dashboard/settings/SettingsModal'
// TODO: create post settings route and update line below
import { postSignup } from '../actions/api/authActions'
import React, { Component, PropTypes } from 'react'

class Settings extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  render() {
    const { actions } = this.props
    return (
        <div className="container">
          <SettingsModal showSettings={actions.showSettings} saveSettings={actions.postSignup} />
        </div>
      )
  }
}

Settings.childContextTypes = {
  muiTheme: PropTypes.object
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error
  }
}

function mapDispatchToProps(dispatch) {
  return {

    // TODO: update this
    actions: bindActionCreators({ postSignup: postSignup }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
