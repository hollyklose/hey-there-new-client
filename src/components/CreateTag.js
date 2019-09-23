import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_TAG_MUTATION, DELETE_TAG_MUTATION } from '../shared/mutations'
import { withRouter, Link } from 'react-router-dom'
import { TAGS_QUERY } from '../shared/queries'
import Layout from './Layout'
import Button from 'react-bootstrap/Button'
import TagForm from './TagForm'

const CreateTag = props => {
  const [tag, setTag] = useState(
    {
      name: '',
      genre: 'location',
      customTagDescription: ''
    }
  )
  const [disabled, setDisabled] = useState(
    {
      disabled: true
    }
  )
  // const [tagId, setTagId] = useState(
  //   {
  //     tagId: null
  //   }
  // )
  console.log('disabled', disabled)
  const handleChange = event => {
    event.persist()
    if (event.target.name === 'genre' && event.target.value === 'custom') {
      setDisabled(false)
    } else if (event.target.name === 'genre' && event.target.value !== 'custom') {
      setDisabled(true)
      setTag(tag => ({ ...tag, 'customTagDescription': '' }))
    }
    setTag(tag => ({ ...tag, [event.target.name]: event.target.value }))
  }
  const { name, genre, customTagDescription } = tag
  const userId = props.user.id
  const { alert } = props
  const [ManageTag] = useMutation(
    CREATE_TAG_MUTATION,
    { variables: { name, genre, customTagDescription, userId }
    }
  )
  const [DeleteTag] = useMutation(
    DELETE_TAG_MUTATION
  )
  const { data, loading, error, refetch } = useQuery(
    TAGS_QUERY,
    { variables: { userId },
      fetchPolicy: 'network-only'
    }
  )
  let tags = []
  tags = data.tags
  return (
    <Layout>
      <TagForm
        tag={tag}
        setTag={setTag}
        handleChange={handleChange}
        ManageTag={ManageTag}
        disabled={disabled}
        setDisabled={setDisabled}
        refetch={refetch}
        alert={alert}
        type={'create'}
      />
      <br /><br />
      <h3>Existing Tags</h3>
      {loading && <p>Loading</p>}
      {error && <p>There is a problem loading your data. Please try again. ERROR: { error.message }</p>}
      {!tags || tags.length === 0
        ? <p>You have no tags! Why not add one now?</p>
        : tags.map(tag =>
          <p key={tag.id}>
            {tag.name} ({tag.genre !== 'custom' ? tag.genre : tag.customTagDescription} )
            <Button
              type="submit"
              variant="outline-danger"
              size="sm"
              title="Delete this tag"
              onClick={() => {
                DeleteTag({ variables: {
                  id: parseInt(tag.id),
                  userId: userId
                }
                })
                  .then(() => {
                    alert({
                      heading: 'Tag Deleted',
                      message: `${tag.genre}: ${tag.name} has been deleted!`,
                      variant: 'success'
                    })
                    refetch()
                  })
                  .catch((error) =>
                    alert({
                      heading: 'Tag Not Deleted',
                      message: `There is a problem deleting your tag. Please try again. ERROR: ${error.message}`,
                      variant: 'danger'
                    })
                  )
              }}
            >
              X
            </Button>
            <Link to={`/manage-tags/${tag.id}`}>
              <Button variant="outline-info" title="Edit tag">Edit</Button>
            </Link>
          </p>
        )
      }
    </Layout>
  )
}

export default withRouter(CreateTag)
