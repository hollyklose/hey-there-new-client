import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
// import { CONTACTLIST_QUERY } from './ContactList'

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: Int!, $userId: Int!) {
    deleteContact(id: $id, userId: $userId) {
      id
      userId
    }
  }
`

class Contact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contact: null,
      deleted: false
    }
  }
  render () {
    const { name, howMet, frequency, priority, lastContacted } = this.props.contact
    const id = parseInt(this.props.contact.id)
    const userId = parseInt(this.props.user.id)
    // const { history } = this.props
    if (this.state.deleted) {
      return <Redirect to={
        { pathname: '/' }
      }/>
    }
    return (
      <div>
        <div>
          <p>{name}</p>
          <p>{howMet}</p>
          <p>{frequency}</p>
          <p>{priority}</p>
          <p>{lastContacted}</p>
          <p>{this.props.contact.user.email}</p>
          <Mutation
            mutation={DELETE_CONTACT_MUTATION}
            variables={{ id, userId }}
            // update={(store) =>
            //   this.props._updateCacheAfterDelete(store)
            // }
            onCompleted={() =>
              this.setState({ deleted: true })
            }
          >
            {DeleteContact => <button onClick={DeleteContact}>Delete Contact</button>}
          </Mutation>

        </div>
      </div>
    )
  }
}

export default Contact
