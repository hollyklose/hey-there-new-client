import React, { Component } from 'react'
import Contact from './Contact'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const CONTACTLIST_QUERY = gql`
{
  contacts {
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
  render () {
    return (
      <Query query={CONTACTLIST_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const contactsToRender = data.contacts

          return (
            <div>
              {contactsToRender.map(contact => <Contact
                key={contact.id}
                contact={contact}
              />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ContactList
