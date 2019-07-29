import React, { Component } from 'react'
import Contact from './Contact'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import calculateUrgency from '../logic/sorting.js'
import Layout from './Layout'
import Table from 'react-bootstrap/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'

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
    return (
      <Layout>
        <Query fetchPolicy="no-cache"
          query={CONTACTLIST_QUERY}
          variables={ { userId } }
          onCompleted={(res) => {
            this.setState({ contacts: res.contacts })
          }
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Fetching</p>
            if (error) return <p>There is a problem loading your data. Please try again.</p>
            let contactsToRender = data.contacts
            if (contactsToRender.length === 0) {
              return <h4>You have no contacts! Why not add one now?</h4>
            }
            contactsToRender = calculateUrgency(contactsToRender)
            return (
              <Jumbotron fluid>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>How You Met</th>
                      <th>Days Since Last Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsToRender.map(contact => <Contact
                      key={contact.id}
                      contact={contact}
                      user={this.props.user}
                      history= {this.props.history}
                      alert={this.props.alert}
                    />)}
                  </tbody>
                </Table>
              </Jumbotron>
            )
          }}
        </Query>
      </Layout>
    )
  }
}

export default ContactList
