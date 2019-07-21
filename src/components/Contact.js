import React, { Component } from 'react'

class Contact extends Component {
  render () {
    return (
      <div>
        <div>
          <p>{this.props.contact.name}</p>
          <p>{this.props.contact.how_met}</p>
          <p>{this.props.contact.frequency}</p>
          <p>{this.props.contact.priority}</p>
          <p>{this.props.contact.last_contacted}</p>
          <p>{this.props.contact.user.email}</p>

        </div>
      </div>
    )
  }
}

export default Contact
