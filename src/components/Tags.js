import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TAGS_QUERY } from '../shared/queries'
import Layout from './Layout'

const Tags = props => {
  const userId = props.user.id
  const { data, loading, error } = useQuery(
    TAGS_QUERY,
    { variables: { userId },
      fetchPolicy: 'network-only'
    }
  )
  if (loading) return <p>Loading</p>
  if (error) return <p>There is a problem loading your data. Please try again. ERROR: { error.message }</p>
  const tags = data.tags
  if (tags.length === 0) {
    return <h4>You have no tags! Why not add one now?</h4>
  }

  return (
    <Layout>
      {tags.map(tag =>
        <p key={tag.id}>{tag.name}, {tag.genre}, {tag.customTagDescription}</p>
      )}
    </Layout>
  )
}

export default Tags
