import React, { Component, PropTypes } from 'react'
import { Toggle, RadioButton } from 'material-ui'

export class CommunicationSettingsField extends React.Component {

  handleCommunicationSettings(ref) {
    console.log('REFS', this.refs)
    let updates = {
      text_over_budget: this.refs.text_over_budget.isToggled(),
      text_over_total: this.refs.text_over_total.isToggled(),
      text_recs: this.refs.text_recs.isToggled(),
      email_updates: this.refs.email_updates.isToggled()
    }
    this.refs[ref].setToggled(updates[ref])
    this.props.updateCommunicationSettings(updates)
  }

  render() {
    for (let ref in this.refs) {
      this.refs ? this.refs[ref].state.muiTheme.toggle.thumbOffColor = '#4B4B4B' : null
      this.refs ? this.refs[ref].state.muiTheme.toggle.thumbOnColor = '#FF8A80' : null
      this.refs ? this.refs[ref].state.muiTheme.toggle.trackOnColor = '#FF8A80' : null
      this.refs ? this.refs[ref].state.muiTheme.toggle.trackOffColor = '#4B4B4B' : null
    }

    return (
      <form style={{padding: '40px'}}>
        <div className="row">
        <Toggle
          ref="text_over_budget"
          label="Text me when I go over budget in any category"
          labelStyle={{fontFamily: 'Roboto', fontWeight: 'normal'}}
          elementStyle={{backgroundColor: 'red'}}
          onToggle={this.handleCommunicationSettings.bind(this, 'text_over_budget')}
          defaultToggled={this.props.user.text_over_budget}
        />
        <Toggle
          ref="text_over_total"
          label="Text me when I go over my total budget for the month"
          labelStyle={{fontFamily: 'Roboto', fontWeight: 'normal'}}
          onToggle={this.handleCommunicationSettings.bind(this, 'text_over_total')}
          defaultToggled={this.props.user.text_over_total}
        />
        <Toggle
          ref="text_recs"
          label="Text me recomendations to help me meet my goals"
          labelStyle={{fontFamily: 'Roboto', fontWeight: 'normal'}}
          onToggle={this.handleCommunicationSettings.bind(this, 'text_recs')}
          defaultToggled={this.props.user.text_recs}
        />
        <Toggle
          ref="email_updates"
          value={this.props.communicationData.email_data}
          label="Email me weekly updates"
          labelStyle={{fontFamily: 'Roboto', fontWeight: 'normal'}}
          onToggle={this.handleCommunicationSettings.bind(this, 'email_updates')}
          defaultToggled={this.props.user.email_updates}
        />
        </div>
      </form>
    )
  }
}

export default CommunicationSettingsField
