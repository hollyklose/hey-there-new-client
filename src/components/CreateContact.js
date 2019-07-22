import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CONTACT_MUTATION = gql`
  mutation CreateContact($name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    createContact(name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
      name
      howMet
      frequency
      priority
      lastContacted
      user {
        id
        email
      }
    }
  }
`

class CreateContact extends Component {
  state = {
    name: '',
    howMet: '',
    frequency: 0,
    priority: 0,
    lastContacted: new Date()
  }
  render () {
    const { name, howMet, frequency, priority, lastContacted } = this.state
    const userId = this.props.user.id
    const { history } = this.props
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={event => {
              this.setState({ name: event.target.value })
              console.log('hello', event.target.value)
            }}
            type="text"
            placeholder="Contact name"
          />
          <input
            className="mb2"
            value={howMet}
            onChange={event => this.setState({ howMet: event.target.value })}
            type="text"
            placeholder="How you met this person"
          />
          <input
            className="mb2"
            value={frequency}
            onChange={event => {
              this.setState({ frequency: parseInt(event.target.value) })
              console.log('bye', event.target.value)
            }}
            type="number"
            placeholder="How often do you wish to contact this person?"
          />
          <input
            className="mb2"
            value={priority}
            onChange={event => {
              this.setState({ priority: parseInt(event.target.value) })
              console.log('other', event.target.value)
            }}
            type="number"
            placeholder="How high priority is this contact?"
          />
        </div>
        <Mutation
          mutation={CONTACT_MUTATION}
          variables={{ name, howMet, frequency, priority, lastContacted, userId }}
          onCompleted={() => history.push('/')}
        >
          {CreateContact => <button onClick={CreateContact}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateContact
