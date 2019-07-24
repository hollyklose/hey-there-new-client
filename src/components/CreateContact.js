import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

const CONTACT_MUTATION = gql`
  mutation CreateContact($name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    createContact(name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
      name
      howMet
      frequency
      priority
      lastContacted
      id
      user {
        id
        email
      }
    }
  }
`

class CreateContact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contact: {
        name: '',
        howMet: '',
        frequency: 1,
        priority: 1,
        lastContacted: new Date()
      },
      createdContactId: 0
    }
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

    // this.setState({
    //   contact: {
    //     ...this.state.contact,
    //     [event.target.name]: event.target.value
    //   }
    // })
  }

  render () {
    const { name, howMet, frequency, priority, lastContacted } = this.state.contact
    const userId = this.props.user.id
    const { history } = this.props
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={this.handleChange}
            type="text"
            placeholder="Contact name"
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
          mutation={CONTACT_MUTATION}
          variables={{ name, howMet, frequency, priority, lastContacted, userId }}
          // update={(store, { data: { CONTACT_MUTATION } }) => {
          //   // Read the data from our cache for this query.
          //   const data = store.readQuery({ query: CONTACTLIST_QUERY })
          //   // Add our comment from the mutation to the end.
          //   data.contacts.unshift(CONTACT_MUTATION)
          //   // Write our data back to the cache.
          //   store.writeQuery({ query: CONTACTLIST_QUERY, data })
          // }}
          // update={(store, { data: { createContact } }) => {
          //   const data = store.readQuery({ query: CONTACTLIST_QUERY })
          //   data.contacts.unshift(createContact)
          //   console.log(data.contacts)
          //   store.writeQuery({
          //     query: CONTACTLIST_QUERY,
          //     data
          //   })
          // }}

          // NEEDTO SEND CONTACT STATE TO CONTACT.JS
          contact={this.state.contact}
          onCompleted={
            (data) => {
            // this.setState({ createdContactId: data.createContact.id })
              // history.push(`/contacts/${data.createContact.id}`)
              history.push('/contact-list')
              this.props.alert(`${this.state.contact.name} has been added!`, 'success')
              // }
            }}
        >
          {CreateContact => <button onClick={CreateContact}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(CreateContact)
