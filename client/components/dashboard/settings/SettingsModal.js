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
      firstName: this.props.data.user ? this.props.data.user.first_name : '',
      lastName: this.props.data.user ? this.props.data.user.last_name : '',
      phoneNumber: this.props.data.user ? this.props.data.user.phone_number : ''
    }

    let userData = [user.firstName, user.lastName, user.phoneNumber]

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
                userData={userData}
                firstName={user.firstName}
                editFirstName={this.props.editFirstName}
                editingFirstName={this.props.editingFirstName}
                lastName={user.lastName}
                editLastName={this.props.editLastName}
                editingLastName={this.props.editingLastName}
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
