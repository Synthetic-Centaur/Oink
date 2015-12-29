import React, { Component, PropTypes } from 'react'
import { Toggle, RadioButton } from 'material-ui'

export class CommunicationSettingsField extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  handleCommunicationSettings(ref) {
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
    return (
      <form style={{padding: '24px'}}>
        <div className="row">
        <Toggle
          ref="text_over_budget"
          label="Text me when I go over budget in any category"
          onToggle={this.handleCommunicationSettings.bind(this, 'text_over_budget')}
          defaultToggled={this.props.user.text_over_budget}
        />
        <Toggle
          ref="text_over_total"
          label="Text me when I go over my total budget for the month"
          onToggle={this.handleCommunicationSettings.bind(this, 'text_over_total')}
          defaultToggled={this.props.user.text_over_total}
        />
        <Toggle
          ref="text_recs"
          label="Text me recomendations to help me meet my goals"
          onToggle={this.handleCommunicationSettings.bind(this, 'text_recs')}
          defaultToggled={this.props.user.text_recs}
        />
        <Toggle
          ref="email_updates"
          value={this.props.communicationData.email_data}
          label="Email me weekly updates"
          onToggle={this.handleCommunicationSettings.bind(this, 'email_updates')}
          defaultToggled={this.props.user.email_updates}
        />
        </div>
      </form>
    )
  }
}

export default CommunicationSettingsField
