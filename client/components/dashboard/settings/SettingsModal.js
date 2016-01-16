import React, { Component, PropTypes } from 'react'
import { Dialog, Tabs, Tab, FlatButton } from 'material-ui'
import { Link } from 'react-router'
import AccountSettingsField from './AccountSettingsField'
import CommunicationSettingsField from './CommunicationSettingsField'
import SecuritySettingsField from './SecuritySettingsField'
import Theme from '../../../settings-theme.js'
import ThemeManager from 'material-ui/lib/styles/theme-manager'

class SettingsModal extends Component {

  getChildContext() {

    // Get styles for settings modal
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    })
  }

  componentDidUpdate() {
    if (this.props.showSettings) {
      this.refs.modal.show()
    }
  }

  handleSubmit(e) {

    // Prevent defualt action on submit button
    e.preventDefault()

    const { showSettings, editFinishAll, accountData, securityData } = this.props

    // Verify that there are no errors on page before submitting
    if (!accountData.errorText && !securityData.errorText) {

      // Submit all changes
      this.handleSettings()

      // Update all editing properties on state to false
      editFinishAll()
    }
  }

  handleSettings() {

    const { showSettings, hideSettingsModal, editFinishAll, accountData, communicationData, securityData } = this.props

    // Create variables to store fields to update in database
    let completeData = {}
    let dataLength = 0

    // Loop through account data and add all properties that require an update to completeData
    for (let key in accountData) {
      if (key !== 'errorText') {
        completeData[key] = accountData[key]
        dataLength++
      }
    }

    // Loop through communication data and add all properties that require an update to completeData
    for (let key in communicationData) {
      completeData[key] = communicationData[key]
      dataLength++
    }

    // Verify that new password field in security data exists and that password has been verified
    if (securityData.newPassword && !securityData.errorText) {
      completeData.password = securityData.newPassword
      dataLength++
    }

    // Verify that user has made changes before sending
    if (dataLength > 0) {    
      this.props.postSettings(completeData)
      this.props.hideSettingsModal()
      this.refs.modal.dismiss()
    } else {

      // If user has not made any changes, assume they hit save to close and close modal
      showSettings ? hideSettingsModal() : null
      editFinishAll()
      this.refs.modal.dismiss()
    }
  }

  handleCancel(e) {

    // Prevent defualt action on cancel button
    e.preventDefault()

    const {showSettings, hideSettingsModal, editFinishAll, editingEmail, editingPassword,
           editingFirstName, editingLastName, editingPhoneNumber, editingDeleteAccount} = this.props

    // If user has edited any of their settings have them verify that they want to cancel before closing modal
    if (editingEmail || editingPhoneNumber || editingPassword || editingFirstName || editingLastName) {
      if (confirm('You have unsaved changes to your settngs, are you sure you want to quit?')) {

        // Hide modal
        showSettings ? hideSettingsModal() : null

        // Set all editing fields on state to false and discard any changes
        editFinishAll()

        // Dismiss modal
        this.refs.modal.dismiss()
      }
    } else {

      // If user has not made any changes to their settings close without sending a warning
      showSettings ? hideSettingsModal() : null
      editFinishAll()
      this.refs.modal.dismiss()
    }
  }

  parsePhoneNumber(num) {

    // Check phone number to verify that it is 10 digits long
    if (num.length === 10) {

      // Display phone number in user friendly format
      return '(' + num.slice(0, 3) + ')' + num.slice(3, 6) + '-' + num.slice(6)
    }

    return num
  }

  tabStyle(ref) {

    // List of all tab refs
    let tabRefs = ['accountTab', 'communicationTab', 'securityTab']


    // Highlight the currently active tab by checking each tab and coloring appropriately
    for (let i = 0; i < tabRefs.length; i++) {
      let tab = tabRefs[i]
      if (tab === ref) {
        this.refs[tab].props.style.color = '#222'
        this.refs[tab].props.style.backgroundColor = '#ccc'
      } else {
        this.refs[tab].props.style.color = '#B4CCB9'
        this.refs[tab].props.style.backgroundColor = '#4B4B4B'
      }
    }
  }

  tabStyleConst(ref) {

    // Set the initial tab style to the account tab highlighted as active
    if (this.refs[ref]) {
      if (this.refs[ref].props.selected) {
        return {color: '#222', backgroundColor: '#ccc'}
      }

      return {color: '#B4CCB9', backgroundColor: '#4B4B4B'}
    }
    
    if (ref === 'accountTab') {
      return {color: '#222', backgroundColor: '#ccc'}
    }

    return {color: '#B4CCB9', backgroundColor: '#4B4B4B'}
  }

  render() {

    // Overwrite material-ui default gutter setting to set padding around modal body to 0
    this.refs.modal ? this.refs.modal.state.muiTheme.rawTheme.spacing.desktopGutter = 0 : null
    let user = {
      firstName: this.props.data.user ? this.props.data.user.first_name : '',
      lastName: this.props.data.user ? this.props.data.user.last_name : '',
      email: this.props.data.user ? this.props.data.user.email : '',
      phoneNumber: this.props.data.user ? this.props.data.user.phone_number : ''
    }

    let userData = [
      {property: user.firstName, title: 'First Name', key: 'FIRST_NAME', editing: this.props.editingFirstName},
      {property: user.lastName,  title: 'Last Name', key: 'LAST_NAME', editing: this.props.editingLastName},
      {property: user.email,  title: 'Email', key: 'EMAIL', editing: this.props.editingEmail},
      {property: this.parsePhoneNumber(user.phoneNumber), title: 'Phone Number', key: 'PHONE_NUMBER', editing: this.props.editingPhoneNumber}
    ]

    let modalActions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        style={{backgroundColor: '#ccc'}}
        onTouchTap={this.handleCancel.bind(this)} />,
      <FlatButton
        key={1}
        label="Save"
        style={{backgroundColor: '#ccc'}}
        onTouchTap={this.handleSubmit.bind(this)} />
    ]
    return (
      <Dialog
        ref="modal"
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
        contentStyle={{backgroundColor: '#ccc'}}
      >
        <Tabs className="settings-tabs" style={{color: '#ff1970'}}>
          <Tab label="Account" ref="accountTab" onActive={this.tabStyle.bind(this, 'accountTab')} style={this.tabStyleConst('accountTab')}>
            <div className="modal-content">

              <AccountSettingsField
                userData={userData}
                editStart={this.props.editStart}
                editFinish={this.props.editFinish}
                firstName={user.firstName}
                editingFirstName={this.props.editingFirstName}
                lastName={user.lastName}
                editingLastName={this.props.editingLastName}
                email={user.email}
                editingEmail={this.props.editingEmail}
                phoneNumber={user.phoneNumber}
                editingPhoneNumber={this.props.editingPhoneNumber}
                updateAccountSettings={this.props.updateAccountSettings}
                updateCommunicationSettings={this.props.updateCommunicationSettings}
                updateSecuritySettings={this.props.updateSecuritySettings}
                accountData={this.props.accountData}
              />
              
            </div>
          </Tab>
          <Tab label="Communication" ref="communicationTab" onActive={this.tabStyle.bind(this, 'communicationTab')} style={this.tabStyleConst('communicationTab')}>
            <div className="modal-content">

              <CommunicationSettingsField
                user={this.props.data.user}
                updateCommunicationSettings={this.props.updateCommunicationSettings}
                communicationData={this.props.communicationData}
              />
              
            </div>
          </Tab>
          <Tab label="Security" ref="securityTab" onActive={this.tabStyle.bind(this, 'securityTab')} style={this.tabStyleConst('securityTab')}>
            <div className="modal-content">

              <SecuritySettingsField
                editStart={this.props.editStart}
                editFinish={this.props.editFinish}
                editingPassword={this.props.editingPassword}
                editingDeleteAccount={this.props.editingDeleteAccount}
                updateSecuritySettings={this.props.updateSecuritySettings}
                securityData={this.props.securityData}
                deleteAccount={this.props.deleteAccount}
              />
              
            </div>
          </Tab>
        </Tabs>
      </Dialog>
    )
  }
}

SettingsModal.propTypes = {
  accountData: PropTypes.object,
  communicationData: PropTypes.object,
  data: object,
  deleteAccount: PropTypes.func,
  editFinish: PropTypes.func,
  editFinishAll: PropTypes.func,
  editStart: PropTypes.func,
  editingDeleteAccount: PropTypes.bool,
  editingEmail: PropTypes.bool,
  editingFirstName: PropTypes.bool,
  editingLastName: PropTypes.bool,
  editingPassword: PropTypes.bool,
  editingPhoneNumber: PropTypes.bool,
  hideSettingsModal: PropTypes.func,
  postSettings: PropTypes.func,
  securityData: PropTypes.object,
  showSettings: PropTypes.bool,
  showSettingsModal: PropTypes.func,
  updateAccountSettings: PropTypes.func,
  updateCommunicationSettings: PropTypes.func,
  updateSecuritySettings: PropTypes.func
}

SettingsModal.childContextTypes = {
  muiTheme: PropTypes.object
}
export default SettingsModal
