import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: Int!, $userId: Int!) {
    deleteContact(id: $id, userId: $userId) {
      userId
      id
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
      console.log('redirecting')
      return <Redirect to={
        { pathname: '/contact-list' }
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
          <Link to={`/edit-contact/${id}`}>
            <Button>Edit Contact</Button>
          </Link>
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

export default withRouter(Contact)
