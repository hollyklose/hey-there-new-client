import React from 'react'
import Contact from './Contact'
import { useQuery } from '@apollo/react-hooks'
import CONTACTLIST_QUERY from '../queries'
import calculateUrgency from '../logic/sorting'
import Layout from './Layout'
import Table from 'react-bootstrap/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'

const ContactList = props => {
  const userId = props.user.id
  const { data, loading, error, refetch } = useQuery(
    CONTACTLIST_QUERY,
    { variables: { userId },
      fetchPolicy: 'network-only'
    }
  )
  if (loading) return <p>Loading</p>
  if (error) return <p>There is a problem loading your data. Please try again. ERROR: { error.message }</p>
  let contactsToRender = data.contacts
  if (contactsToRender.length === 0) {
    return <h4>You have no contacts! Why not add one now?</h4>
  }
  contactsToRender = calculateUrgency(contactsToRender)

  return (
    <Layout>
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
              user={props.user}
              alert={props.alert}
              history= {props.history}
              refetch= {refetch}
            />)}
          </tbody>
        </Table>
      </Jumbotron>
    </Layout>
  )
}

export default ContactList
