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
    e.preventDefault()
    const { showSettings, editFinishAll } = this.props
    showSettings ? this.handleSettings() : null
    editFinishAll()
  }

  handleSettings() {

    const { accountData, communicationData, securityData } = this.props

    let completeData = {}

    for (let key in accountData) {
      if (key !== 'errorText') {
        completeData[key] = accountData[key]
      }
    }

    for (let key in communicationData) {
      completeData[key] = communicationData[key]
    }

    // verify that new password field in security data exists and that password has been verified
    if (securityData.newPassword && !securityData.errorText) {
      completeData.password = securityData.newPassword
    }

    this.props.postSettings(completeData)
    this.props.hideSettingsModal()
    this.refs.modal.dismiss()
  }

  handleCancel(e) {
    e.preventDefault()
    const {showSettings, hideSettingsModal, editFinishAll, editingEmail, editingPassword,
           editingFirstName, editingLastName, editingPhoneNumber, editingDeleteAccount} = this.props
    if (editingEmail || editingPhoneNumber || editingPassword || editingFirstName || editingLastName) {
      if (confirm('You have unsaved changes to your settngs, are you sure you want to quit?')) {
        showSettings ? hideSettingsModal() : null
        editFinishAll()
        this.refs.modal.dismiss()
      }
    } else {
      showSettings ? hideSettingsModal() : null
      editFinishAll()
      this.refs.modal.dismiss()
    }
  }

  parsePhoneNumber(num) {
    if (num.length === 10) {
      return '(' + num.slice(0, 3) + ')' + num.slice(3, 6) + '-' + num.slice(6)
    }

    return num
  }

  tabStyle(ref) {
    let tabRefs = ['accountTab', 'communicationTab', 'securityTab']

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
    // overwrite material-ui default gutter setting to set padding around modal body to 0
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
  showSettings: PropTypes.bool.isRequired,
  hideSettingsModal: PropTypes.func.isRequired,
  showSettingsModal: PropTypes.func.isRequired
}

SettingsModal.childContextTypes = {
  muiTheme: PropTypes.object
}
export default SettingsModal
