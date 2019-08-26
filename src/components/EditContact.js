import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import EditContactForm from './EditContactForm'
import Layout from './Layout'
import { SINGLE_CONTACT_QUERY } from '../shared/queries'

const EditContact = props => {
  const userId = props.user.id
  const id = parseInt(props.match.params.id)
  const { data, loading, error } = useQuery(
    SINGLE_CONTACT_QUERY,
    { variables: { userId, id } }
  )
  if (loading) return <p>Loading</p>
  if (error) return <p>There is a problem loading your data. Please try again. ERROR: { error.message }</p>
  const singleContact = data.contact
  return (
    <Layout>
      <div>
        <h2>Edit Contact</h2>
        <EditContactForm
          key={singleContact.id}
          contact={singleContact}
          user={props.user}
          history= {props.history}
          alert={props.alert}
        />
      </div>
    </Layout>
  )
}

export default withRouter(EditContact)
