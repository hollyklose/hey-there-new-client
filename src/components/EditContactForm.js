import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_CONTACT_MUTATION } from '../shared/mutations'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditContactForm = props => {
  const [contact, setContact] = useState(
    {
      name: '',
      howMet: '',
      frequency: 1,
      priority: 0,
      validationError: false
    }
  )
  // componentDidMount () {
  useEffect(() => setContact(props.contact), [])
  const handleChange = event => {
    event.persist()
    let newValue = event.target.value
    if (event.target.name === 'frequency' || event.target.name === 'priority') {
      newValue = parseInt(event.target.value)
    }
    setContact(contact => ({ ...contact, [event.target.name]: newValue }))
  }
  const { name, howMet, frequency, priority, lastContacted } = contact
  const id = parseInt(contact.id)
  const userId = props.user.id
  const { history, alert } = props
  const [UpdateContact] = useMutation(
    UPDATE_CONTACT_MUTATION,
    { variables: { userId, id, name, howMet, frequency, priority, lastContacted }
    }
  )
  return (
    <Fragment>
      <Form>
        <Form.Group controlId="formContactName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contact name"
            required
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFrequencyOfContact">
          <Form.Label>Frequency of Contact</Form.Label>
          <Form.Text className="text-muted">
            How often do you wish to contact them (in days)? This may be between 1 and 730 days.
          </Form.Text>
          <Form.Control
            value={frequency}
            onChange={handleChange}
            type="number"
            min="1"
            max="730"
            placeholder="30"
            required
            name="frequency"
          />
        </Form.Group>
        <Form.Group controlId="formHowMet">
          <Form.Label>How you Met</Form.Label>
          <Form.Text className="text-muted">
            How did you meet, or how do you know, this person?
          </Form.Text>
          <Form.Control
            value={howMet}
            onChange={handleChange}
            type="text"
            placeholder="How you met"
            required
            name="howMet"
          />
        </Form.Group>
        <Form.Group controlId="formPriority">
          <Form.Label>Contact Priority</Form.Label>
          <Form.Text className="text-muted">
            How high of a priority is contacting this person?
          </Form.Text>
          <Form.Control
            value={priority}
            onChange={handleChange}
            type="range"
            min="1"
            max="100"
            placeholder="50"
            required
            name="priority"
          />
        </Form.Group>
      </Form>
      <Button
        type="submit"
        variant="info"
        className="button"
        onClick={() => {
          UpdateContact()
            .then(() => {
              history.push('/contact-list')
              alert({
                heading: 'Contact Edited',
                message: `${contact.name} has been edited!`,
                variant: 'success'
              })
            })
            .catch((error) =>
              alert({
                heading: 'Contact Not Edited',
                message: `There was a problem editing your contact. Please fill out all fields and make sure frequency is between 1 and 730 days. ERROR: ${error.message}`,
                variant: 'danger'
              })
            )
        }}
      >
        Submit
      </Button>
      <Link to='/contact-list'>
        <Button type="submit" variant="danger">Cancel</Button>
      </Link>
    </Fragment>
  )
}

export default withRouter(EditContactForm)
