// ## Profile Card displaying info for each team member

import React, {Component, PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import FlatButton from 'material-ui/lib/flat-button'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'

class ProfileCard extends Component {
  render() {
    const { name, title, description, picture, github, linkedin, email } = this.props
    return (
      <Card className="card">

        <CardHeader
          className="header"
          style={{padding: '16px 0', height: '160px'}}
          title={name}
          subtitle={title}
          avatar={<Avatar className="avatar" src={picture} size={100} />}
        />

        <div className="icon-container u-full-width">
          <div className="row">

            <a className="github-icon one-third column" href={github}>
              <IconButton
                style={{left: '50%', transform: 'translateX(-50%)'}}
                tooltipPosition="bottom-center"
                tooltip="Github"
              >
                <img src="/images/github.png" alt="github"/>
              </IconButton>
            </a>
            
            <a className="linkedin-icon one-third column" href={linkedin}>
              <IconButton
                style={{left: '50%', transform: 'translateX(-50%)'}}
                tooltipPosition="bottom-center"
                tooltip="LinkedIn"
              >
                <img src="/images/linkedin.jpg" alt="linkedin"/>
              </IconButton>
            </a>

            <a className="email-icon one-third column" href={'mailto:' + email}>
              <IconButton
                style={{left: '50%', transform: 'translateX(-50%)'}}
                tooltipPosition="bottom-center"
                tooltip="Email">
                <img src="/images/email.png" alt="email"/>
              </IconButton>
            </a>
          </div>
        </div>

        <CardText className="about-text">
          { description }
        </CardText>

      </Card>
    )
  }
}

// Specify what props are required by the component
ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ProfileCard
