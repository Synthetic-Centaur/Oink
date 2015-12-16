import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

export class CommunicationSettingsField extends React.Component {
  render() {
    return (
      <form>
        <div className="row">
          <TextField ref="phone" hintText="Phone"/>
        </div>
      </form>
    )
  }
}

export default CommunicationSettingsField
