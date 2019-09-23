import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TagForm = ({ history, type, tag, setTag, handleChange, ManageTag, disabled, setDisabled, refetch, alert }) => (
  <Fragment>
    <Form>
      <Form.Group controlId="formTagGenre">
        <Form.Label>Tag Category</Form.Label>
        <Form.Text>If choosing custom category, please describe below.</Form.Text>
        <Form.Control
          as="select"
          required
          name="genre"
          value={tag.genre}
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
          value={tag.customTagDescription}
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
          value={tag.name}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
    <Button
      type="submit"
      variant="info"
      className="button"
      onClick={() => {
        ManageTag()
          .then(() => {
            alert({
              heading: 'Tag Added/Edited/Added',
              message: `${tag.genre}: ${tag.name} has been added/edited!`,
              variant: 'success'
            })
            if (type === 'create') {
              refetch()
              setTag({
                name: '',
                genre: 'location',
                customTagDescription: ''
              }
              )
              setDisabled(true)
            } else if (type === 'edit') {
              history.push('/manage-tags')
            }
          })
          .catch((error) =>
            alert({
              heading: 'Problem Adding/Editing Tag',
              message: `There was a problem with your tag. If custom category, please describe it. ERROR: ${error.message}`,
              variant: 'danger'
            })
          )
      }}
    >
    Submit
    </Button>
    <Link to={type === 'create'
      ? '/contact-list'
      : '/manage-tags'
    }
    >
      <Button type="submit" variant="danger">Cancel</Button>
    </Link>
  </Fragment>
)

export default TagForm
