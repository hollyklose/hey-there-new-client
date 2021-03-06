import gql from 'graphql-tag'

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    createContact(name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
      name
    }
  }
`

export const DELETE_CONTACT_MUTATION = gql`
  mutation deleteContact($id: Int!, $userId: Int!) {
    deleteContact(id: $id, userId: $userId) {
      id
    }
  }
`

export const UPDATE_LAST_CONTACTED_MUTATION = gql`
  mutation updateLastContacted($id: Int!, $userId: Int!, $lastContactedToday: DateTime!) {
    updateLastContacted(id: $id, userId: $userId, lastContactedToday: $lastContactedToday) {
      name
    }
  }
`

export const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact($id: Int!, $name: String!, $howMet: String!, $frequency: Int!, $priority: Int!, $lastContacted: DateTime!, $userId: Int!) {
    updateContact(id: $id, name: $name, howMet: $howMet, frequency: $frequency, priority: $priority, lastContacted: $lastContacted, userId: $userId) {
      name
    }
  }
`

export const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($name: String!, $genre: TypeCategory!, $customTagDescription: String, $userId: Int!) {
    createTag(name: $name, genre: $genre, customTagDescription: $customTagDescription, userId: $userId) {
      name
      genre
      customTagDescription
    }
  }
`

export const DELETE_TAG_MUTATION = gql`
  mutation deleteTag($id: Int!, $userId: Int!) {
    deleteTag(id: $id, userId: $userId) {
      id
    }
  }
`

export default CREATE_CONTACT_MUTATION
