import React, { Fragment } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_CONTACT_MUTATION, UPDATE_LAST_CONTACTED_MUTATION } from '../mutations'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import moment from 'moment'

const Contact = props => {
  const { name, howMet, lastContacted } = props.contact
  const id = parseInt(props.contact.id)
  const userId = parseInt(props.user.id)
  const lastContactedToday = moment()
  const { alert } = props
  let daysSinceLastContact = Math.floor((lastContactedToday - moment(lastContacted)) / 86400000)
  if (daysSinceLastContact === 0) {
    daysSinceLastContact = 1
  }
  const [deleteContact] = useMutation(
    DELETE_CONTACT_MUTATION,
    { variables: { id, userId }
    }
  )
  const [updateLastContacted] = useMutation(
    UPDATE_LAST_CONTACTED_MUTATION,
    { variables: { id, userId, lastContactedToday }
    }
  )
  return (
    <Fragment>
      <tr>
        <td>{name}</td>
        <td>{howMet}</td>
        <td>{daysSinceLastContact} days</td>
      </tr>
      <ButtonGroup aria-label="Contact List" size="sm" style={{ marginBottom: '1rem' }}>
        <Link to={`/edit-contact/${id}`}>
          <Button variant="info" title="Edit contact info, length of contact time or priority">Edit</Button>
        </Link>
        <Button
          type="submit"
          variant="danger"
          title="Delete this contact"
          onClick={() => {
            deleteContact()
              .then(() => {
                alert(`${name} has been deleted!`, 'success')
                props.refetch()
              })
              .catch((error) =>
                alert(`There is a problem deleting your contact. Please try again. ERROR: ${error.message}`)
              )
          }}
        >
          Delete
        </Button>
        <Button
          type="submit"
          variant="info"
          title="Mark contact as contacted!"
          onClick={() => {
            updateLastContacted()
              .then(() => {
                alert(`${name} has been marked as contacted!`, 'success')
                props.refetch()
              })
              .catch((error) =>
                alert(`There is a problem updating your contact. Please try again. ERROR: ${error.message}`)
              )
          }}
        >
          Contacted✔
        </Button>
      </ButtonGroup>
    </Fragment>
  )
}

export default withRouter(Contact)
