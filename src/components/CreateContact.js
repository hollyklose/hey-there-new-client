import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import Layout from './Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CONTACT_MUTATION = gql`
  mutation CreateContact($name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    createContact(name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
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

class CreateContact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contact: {
        name: '',
        howMet: '',
        frequency: 1,
        priority: 1,
        lastContacted: moment()
      },
      createdContactId: 0
    }
  }

  handleChange = event => {
    let newField = {
      [event.target.name]: event.target.value
    }
    if (newField.frequency) {
      newField = {
        'frequency': parseInt(event.target.value)
      }
    }
    if (newField.priority) {
      newField = {
        'priority': parseInt(event.target.value)
      }
    }
    const updatedContact = Object.assign(this.state.contact, newField)
    this.setState({ contact: updatedContact })
  }

  render () {
    const { name, howMet, frequency, priority, lastContacted } = this.state.contact
    const userId = this.props.user.id
    const { history } = this.props
    return (
      <Layout>
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
              How often do you wish to contact them (in days)?
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
          mutation={CONTACT_MUTATION}
          variables={{ name, howMet, frequency, priority, lastContacted, userId }}
          contact={this.state.contact}
          onCompleted={
            (data) => {
              history.push('/contact-list')
              this.props.alert(`${this.state.contact.name} has been added!`, 'success')
            }}
        >
          {CreateContact => <Button type="submit" variant="info"
            onClick={() => {
              CreateContact({
                variables: { name, howMet, frequency, priority, lastContacted, userId }
              }).then((data) => {
              })
                .catch(() => {
                  this.props.alert('There was a problem adding your contact. Please fill out all fields and make sure frequency is between 1 and 730.', 'danger')
                })
            }}
          >Submit</Button>}
        </Mutation>
        <Link to='/contact-list'>
          <Button type="submit" variant="danger">Cancel</Button>
        </Link>
      </Layout>
    )
  }
}

export default withRouter(CreateContact)
