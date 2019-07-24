import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact($id: Int!, $name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    updateContact(id: $id, name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
      name
      howMet
      frequency
      priority
      lastContacted
      id
      userId
      user {
        id
        email
      }
    }
  }
`
class EditContactForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contact: {
        name: '',
        howMet: '',
        frequency: 0,
        priority: 0
      }
    }
  }
  componentDidMount () {
    console.log('here', this.props.contact)
    this.setState({ contact: this.props.contact })
    console.log('form contactfirstone', this.state.contact)
  }
handleChange = event => {
  let newField = {
    [event.target.name]: event.target.value
  }
  if (newField.frequency) {
    newField = {
      'frequency': parseInt(event.target.value)
    }
  }
  if (newField.priority) {
    newField = {
      'priority': parseInt(event.target.value)
    }
  }
  const updatedContact = Object.assign(this.state.contact, newField)
  this.setState({ contact: updatedContact })
}
render () {
  // console.log('here', this.props.user)
  // console.log('there', this.props.contact)
  // this.setState = ({ contact: this.props.contact })
  // console.log('form contactfirstone', this.state.contact)
  // console.log('form contact', this.state.contact)
  const { name, howMet, frequency, priority, lastContacted } = this.state.contact
  const id = parseInt(this.state.contact.id)
  const userId = this.props.user.id
  console.log('userid', userId)
  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={name}
          onChange={this.handleChange}
          type="text"
          required
          name="name"
        />
        <input
          className="mb2"
          value={howMet}
          onChange={this.handleChange}
          type="text"
          placeholder="How you met this person"
          required
          name="howMet"
        />
        <input
          className="mb2"
          value={frequency}
          onChange={this.handleChange}
          type="number"
          min="1"
          max="730"
          placeholder="30"
          required
          name="frequency"
        />
        <input
          className="mb2"
          value={priority}
          onChange={this.handleChange}
          type="range"
          min="1"
          max="100"
          placeholder="50"
          required
          name="priority"
        />
      </div>
      <Mutation
        mutation={UPDATE_CONTACT_MUTATION}
        variables={{ userId, id, name, howMet, frequency, priority, lastContacted }}
        onCompleted={
          (data) => {
            // this.setState({ createdContactId: data.createContact.id })
          // history.push(`/contacts/${data.createContact.id}`)
            this.props.history.push('/contact-list')
            this.props.alert(`${this.state.contact.name} has been edited!`, 'success')
          // }
          }}
      >
        {EditContactForm => <button onClick={EditContactForm}>Edit</button>}
      </Mutation>
      <Link to='/contact-list'>
        <button>Cancel</button>
      </Link>
    </div>
  )
}
}

export default withRouter(EditContactForm)
