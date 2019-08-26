import gql from 'graphql-tag'

const CONTACTLIST_QUERY = gql`
query contactList($userId: Int!) {
  contacts(userId: $userId) {
    id
    name
    howMet
    frequency
    priority
    lastContacted
    user {
      id
      email
    }
  }
}
`

export const SINGLE_CONTACT_QUERY = gql`
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

export default CONTACTLIST_QUERY
