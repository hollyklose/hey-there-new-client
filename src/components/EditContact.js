import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import EditContactForm from './EditContactForm'

// const UPDATE_CONTACT_MUTATION = gql`
//   mutation UpdateContact($id: Int!, $name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
//     updateContact(id: $id, name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
//       name
//       howMet
//       frequency
//       priority
//       lastContacted
//       id
//       user {
//         id
//         email
//       }
//     }
//   }
// `
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
  constructor (props) {
    super(props)

    this.state = {
      contact: {
        name: '',
        howMet: '',
        frequency: 0,
        priority: 0,
        lastContacted: new Date(),
        id: null
      }
    }
  }

  // handleChange = event => {
  //   let newField = {
  //     [event.target.name]: event.target.value
  //   }
  //   if (newField.frequency) {
  //     newField = {
  //       'frequency': parseInt(event.target.value)
  //     }
  //   }
  //   if (newField.priority) {
  //     newField = {
  //       'priority': parseInt(event.target.value)
  //     }
  //   }
  //   const updatedContact = Object.assign(this.state.contact, newField)
  //   this.setState({ contact: updatedContact })
  // }

  render () {
    // const { contact } = this.state
    const userId = this.props.user.id
    const id = parseInt(this.props.match.params.id)
    console.log('userid', userId, 'contactid', id)
    // const { history } = this.props
    return (
      <Fragment>
        <Query fetchPolicy="no-cache"
          query={SINGLE_CONTACT_QUERY}
          variables={ { id, userId } }
          // onCompleted={}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error!!</div>
            const singleContact = data.contact
            console.log('contact', singleContact)
            // this.setState({ contact: singleContact })
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
      </Fragment>
      // <div>
      //   <div className="flex flex-column mt3">
      //     <input
      //       className="mb2"
      //       value={name}
      //       onChange={this.handleChange}
      //       type="text"
      //       required
      //       name="name"
      //     />
      //     <input
      //       className="mb2"
      //       value={howMet}
      //       onChange={this.handleChange}
      //       type="text"
      //       placeholder="How you met this person"
      //       required
      //       name="howMet"
      //     />
      //     <input
      //       className="mb2"
      //       value={frequency}
      //       onChange={this.handleChange}
      //       type="number"
      //       placeholder="30"
      //       required
      //       name="frequency"
      //     />
      //     <input
      //       className="mb2"
      //       value={priority}
      //       onChange={this.handleChange}
      //       type="number"
      //       placeholder="50"
      //       required
      //       name="priority"
      //     />
      //   </div>
      //   <Mutation
      //     mutation={UPDATE_CONTACT_MUTATION}
      //     variables={{ id, name, howMet, frequency, priority, lastContacted, userId }}
      //     contact={this.state.contact}
      //     onCompleted={
      //       (data) => {
      //         // this.setState({ createdContactId: data.createContact.id })
      //       // history.push(`/contacts/${data.createContact.id}`)
      //         this.props.alert(`${this.state.contact.name} has been edited!`, 'success')
      //       // }
      //       }}
      //   >
      //     {EditContact => <button onClick={EditContact}>Edit</button>}
      //   </Mutation>
      // </div>
    )
  }
}

export default withRouter(EditContact)
