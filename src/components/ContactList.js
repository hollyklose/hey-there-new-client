import React, { Component } from 'react'
import Contact from './Contact'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import calculateUrgency from '../logic/sorting.js'

export const CONTACTLIST_QUERY = gql`
query contactList($userId: Int!) {
  contacts(userId: $userId) {
    id
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

class ContactList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: [],
      loaded: false
    }
  }
  render () {
    const userId = this.props.user.id
    console.log('USERID', userId)
    return (
      <Query fetchPolicy="no-cache"
        query={CONTACTLIST_QUERY}
        variables={ { userId } }
        onCompleted={(res) => {
          this.setState({ contacts: res.contacts })
        }
        }
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Errorcontactlist</div>
          let contactsToRender = data.contacts
          if (contactsToRender.length === 0) {
            return <h4>You have no contacts! Why not add one now?</h4>
          }
          console.log('contacts', contactsToRender)
          contactsToRender = calculateUrgency(contactsToRender)
          console.log('sorted', contactsToRender)
          return (
            <div>
              {contactsToRender.map(contact => <Contact
                key={contact.id}
                contact={contact}
                user={this.props.user}
                history= {this.props.history}
              />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ContactList
