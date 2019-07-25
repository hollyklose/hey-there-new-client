import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact($id: Int!, $name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    updateContact(id: $id, name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
      name
      howMet
      frequency
      priority
      lastContacted
      id
      userId
      user {
        id
        email
      }
    }
  }
`
class EditContactForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contact: {
        name: '',
        howMet: '',
        frequency: 1,
        priority: 0,
        validationError: false
      }
    }
  }
  componentDidMount () {
    this.setState({ contact: this.props.contact })
  }
handleChange = event => {
  let newField = {
    [event.target.name]: event.target.value
  }
  if (newField.frequency) {
    newField = {
      'frequency': parseInt(event.target.value)
    }
    // if (newField.frequency > 730) {
    //   this.setState({ validationError: true, frequency: 1 })
    //   console.log('freq', this.state.frequency)
    // } else if (newField.frequency < 1) {
    //   this.setState({ validationError: true, frequency: 1 })
    // } else if (newField.frequency === '') {
    //   newField = {
    //     'frequency': this.props.contact.frequency
    //   }
    // }
  }
  if (newField.priority) {
    newField = {
      'priority': parseInt(event.target.value)
    }
  }
  const updatedContact = Object.assign(this.state.contact, newField)
  this.setState({ contact: updatedContact })
}
// { this.state.validationError ? <h4>Please fill out all fields. Frequency of days must be between 1 and 730.</h4>
//   : '' }
render () {
  const { name, howMet, frequency, priority, lastContacted } = this.state.contact
  const id = parseInt(this.state.contact.id)
  const userId = this.props.user.id
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
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFrequencyOfContact">
          <Form.Label>Frequency of Contact</Form.Label>
          <Form.Text className="text-muted">
            How often do you wish to contact them (in days)? This may be between 1 and 730 days.
          </Form.Text>
          <Form.Control
            value={frequency}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            type="range"
            min="1"
            max="100"
            placeholder="50"
            required
            name="priority"
          />
        </Form.Group>
      </Form>
      <Mutation
        mutation={UPDATE_CONTACT_MUTATION}
        variables={{ userId, id, name, howMet, frequency, priority, lastContacted }}
        onCompleted={
          (data) => {
            this.props.history.push('/contact-list')
            this.props.alert(`${this.state.contact.name} has been edited!`, 'success')
          }}
      >
        {EditContactForm => <Button type="submit" variant="info"
          onClick={() => {
            EditContactForm({
              variables: { userId, id, name, howMet, frequency, priority, lastContacted }
            }).then((data) => {
            })
              .catch(() => {
                this.props.alert('There was a problem editing your contact. Please fill out all fields and make sure frequency is between 1 and 730.', 'danger')
              })
          }}
        >Edit</Button>}
      </Mutation>
      <Link to='/contact-list'>
        <button>Cancel</button>
      </Link>
    </Fragment>
  )
}
}

export default withRouter(EditContactForm)
