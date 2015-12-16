import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import { Link } from 'react-router'
import AccountSettingsField from './AccountSettingsField'
import CommunicationSettingsField from './CommunicationSettingsField'

class SettingsModal extends Component {

  componentDidUpdate() {
    if (this.props.showSettings) {
      this.refs.modal.show()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { showSettings } = this.props
    showSettings ? this.handleSettings() : null
  }

  handleSettings() {
    const { settingsField } = this.refs
    let firstName = AccountSettingsField.refs.firstName.getValue()
    let lastName = AccountSettingsField.refs.lastName.getValue()
    let email = AccountSettingsField.refs.email.getValue()
    let phone = AccountSettingsField.refs.phone.getValue()
    let password = AccountSettingsField.refs.password.getValue()

    this.props.settings({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
    })
  }

  handleCancel(e) {
    e.preventDefault()
    const { showSettings, hideSettingsModal } = this.props
    showSettings ? hideSettingsModal() : null
    this.refs.modal.dismiss()
  }

  render() {
    let user = {
      firstName: this.props.data.budgets[0].first_name ? this.props.data.budgets[0].first_name : '',
      lastName: this.props.data.budgets[0].last_name ? this.props.data.budgets[0].last_name : '',
      phoneNumber: this.props.data.budgets[0].phone_number ? this.props.data.budgets[0].phone_number : ''
    }

    let modalActions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCancel.bind(this)} />,
      <FlatButton
        key={1}
        label="Save"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)} />
    ]

    return (
      <Dialog
        ref="modal"
        // title="Settings"
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
      >
        <Tabs>
          <Tab label="Account" >
            <div className="modal-content">

              <AccountSettingsField
                firstName={user.firstName}
                lastName={user.lastName}
              />
              
            </div>
          </Tab>
          <Tab label="Communication" >

            <CommunicationSettingsField
              phoneNumber={user.phoneNumber}
            />

          </Tab>
          <Tab
            label="Item Three"
            route="home"
            onActive={this._handleTabActive} />
        </Tabs>
      </Dialog>
    )
  }
}

SettingsModal.propTypes = {
  settings: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  hideSettingsModal: PropTypes.func.isRequired,
  showSettingsModal: PropTypes.func.isRequired
}

export default SettingsModal
