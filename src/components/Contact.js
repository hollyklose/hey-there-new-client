import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import moment from 'moment'

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: Int!, $userId: Int!) {
    deleteContact(id: $id, userId: $userId) {
      userId
      id
    }
  }
`

const UPDATE_LAST_CONTACTED_MUTATION = gql`
  mutation UpdateLastContacted($id: Int!, $userId: Int!, $lastContactedToday: DateTime!) {
    updateLastContacted(id: $id, userId: $userId, lastContactedToday: $lastContactedToday) {
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

class Contact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contact: null,
      deleted: false,
      dateUpdated: false
    }
  }
  render () {
    const { name, howMet, lastContacted } = this.props.contact
    const id = parseInt(this.props.contact.id)
    const userId = parseInt(this.props.user.id)
    const lastContactedToday = moment()
    const { history, alert } = this.props
    let daysSinceLastContact = Math.floor((lastContactedToday - moment(lastContacted)) / 86400000)
    if (daysSinceLastContact === 0) {
      daysSinceLastContact = 1
    }
    return (
      <Fragment>
        <tr>
          <td>{name}</td>
          <td>{howMet}</td>
          <td>{daysSinceLastContact} days</td>
        </tr>
        <ButtonGroup aria-label="Contact List" size="sm" style={{ marginBottom: '1rem' }}>
          <Link to={`/edit-contact/${id}`}>
            <Button variant="info">Edit</Button>
          </Link>
          <Mutation
            mutation={DELETE_CONTACT_MUTATION}
            variables={{ id, userId }}
            onCompleted={() => {
              history.push('/')
              alert(`${name} has been deleted!`, 'success')
            }
            }
          >
            {DeleteContact => <Button type="submit" variant="danger"
              onClick={() => {
                DeleteContact({
                  variables: { id, userId }
                }).then((data) => {
                })
                  .catch(() => {
                    this.props.alert('There was a problem deleting your contact.', 'danger')
                  })
              }}
            >Delete</Button>}
          </Mutation>
          <Mutation
            mutation={UPDATE_LAST_CONTACTED_MUTATION}
            variables={{ id, userId, lastContactedToday }}
            onCompleted={() => {
              history.push('/')
              alert(`${name} has been contacted!`, 'success')
            }}
          >
            {UpdateLastContacted => <Button type="submit" variant="info"
              onClick={() => {
                UpdateLastContacted({
                  variables: { id, userId, lastContactedToday }
                }).then((data) => {
                })
                  .catch(() => {
                    this.props.alert('There was a problem updating.', 'danger')
                  })
              }}
            >✔</Button>}
          </Mutation>
        </ButtonGroup>
      </Fragment>
    )
  }
}

export default withRouter(Contact)
