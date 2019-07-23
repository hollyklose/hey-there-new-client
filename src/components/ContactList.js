import React, { Component } from 'react'
import Contact from './Contact'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
  // history.push('/')
  // _updateCacheAfterDelete = (store) => {
  //   const data = store.readQuery({ query: CONTACTLIST_QUERY })
  //   store.writeQuery({ query: CONTACTLIST_QUERY, data })
  // }
  render () {
    const userId = this.props.user.id
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
          if (error) return <div>Error</div>
          const contactsToRender = data.contacts
          console.log('contacts', contactsToRender)
          return (
            <div>
              {contactsToRender.map(contact => <Contact
                key={contact.id}
                contact={contact}
                user={this.props.user}
                history= {this.props.history}
                // _updateCacheAfterDelete={this._updateCacheAfterDelete}
              />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ContactList
