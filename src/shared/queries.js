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

export const TAGS_QUERY = gql`
query tags($userId: Int!) {
  tags(userId: $userId) {
    id
    name
    genre
    customTagDescription
    user {
      id
      email
    }
  }
}
`

export const SINGLE_TAG_QUERY = gql`
query tag($userId: Int!, $id: Int!) {
  tag(userId: $userId, id: $id) {
    id
    name
    genre
    customTagDescription
  }
}
`

export default CONTACTLIST_QUERY
