import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import EditContactForm from './EditContactForm'
import Layout from './Layout'

const SINGLE_CONTACT_QUERY = gql`
query singleContact($id: Int!, $userId: Int!) {
  contact(id: $id, userId: $userId) {
    id
    name
    howMet
    frequency
    priority
    lastContacted
    user {
      id
    }
  }
}
`

class EditContact extends Component {
  render () {
    const userId = this.props.user.id
    const id = parseInt(this.props.match.params.id)
    return (
      <Layout>
        <Query fetchPolicy="no-cache"
          query={SINGLE_CONTACT_QUERY}
          variables={ { id, userId } }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Fetching</p>
            if (error) return <p>Error loading previous data</p>
            const singleContact = data.contact
            return (
              <div>
                <h2>{singleContact.howMet}</h2>
                <EditContactForm
                  key={singleContact.id}
                  contact={singleContact}
                  user={this.props.user}
                  history= {this.props.history}
                  alert={this.props.alert}
                />
              </div>
            )
          }}
        </Query>
      </Layout>
    )
  }
}

export default withRouter(EditContact)
