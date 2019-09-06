import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_TAG_MUTATION, DELETE_TAG_MUTATION } from '../shared/mutations'
import { withRouter, Link } from 'react-router-dom'
import { TAGS_QUERY } from '../shared/queries'
import Layout from './Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
  const [CreateTag] = useMutation(
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
      <Form>
        <Form.Group controlId="formTagGenre">
          <Form.Label>Tag Category</Form.Label>
          <Form.Text>If choosing custom category, please describe below.</Form.Text>
          <Form.Control
            as="select"
            required
            name="genre"
            value={genre}
            onChange={handleChange}
          >
            <option>location</option>
            <option>company</option>
            <option>school</option>
            <option>hobby</option>
            <option>event</option>
            <option>custom</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCustomTagDescription">
          <Form.Control
            size="sm"
            disabled={disabled}
            type="text"
            placeholder="What is your custom category?"
            required
            name="customTagDescription"
            value={customTagDescription}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTagName">
          <Form.Label>Tag Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name of school, hobby, etc."
            required
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Button
        type="submit"
        variant="info"
        className="button"
        onClick={() => {
          CreateTag()
            .then(() => {
              alert({
                heading: 'Tag Added',
                message: `${genre}: ${name} has been added!`,
                variant: 'success'
              })
              refetch()
              setTag({
                name: '',
                genre: 'location',
                customTagDescription: ''
              }
              )
              setDisabled(true)
            })
            .catch((error) =>
              alert({
                heading: 'Tag Not Added',
                message: `There was a problem adding your tag. If custom category, please describe it. ERROR: ${error.message}`,
                variant: 'danger'
              })
            )
        }}
      >
        Submit
      </Button>
      <Link to='/contact-list'>
        <Button type="submit" variant="danger">Cancel</Button>
      </Link>
      <br /><br />
      <h3>Existing Tags</h3>
      {loading && <p>Loading</p>}
      {error && <p>There is a problem loading your data. Please try again. ERROR: { error.message }</p>}
      {!tags || tags.length === 0
        ? <p>You have no tags! Why not add one now?</p>
        : tags.map(tag =>
          <p key={tag.id}>
            {tag.name} ({tag.genre !== 'custom' ? tag.genre : tag.customTagDescription})
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
                      message: `${genre}: ${name} has been deleted!`,
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
          </p>
        )
      }
    </Layout>
  )
}

export default withRouter(CreateTag)
