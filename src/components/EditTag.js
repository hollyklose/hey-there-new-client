import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { UPDATE_TAG_MUTATION } from '../shared/mutations'
import { SINGLE_TAG_QUERY } from '../shared/queries'
import { withRouter } from 'react-router-dom'
import Layout from './Layout'
import TagForm from './TagForm'

const EditTag = props => {
  const [tag, setTag] = useState(
    {
      name: '',
      genre: '',
      customTagDescription: ''
    }
  )
  const [disabled, setDisabled] = useState(true)
  const userId = props.user.id
  const id = parseInt(props.match.params.id)
  const { data, loading, error } = useQuery(
    SINGLE_TAG_QUERY,
    { variables: { userId, id } }
  )
  useEffect(() => {
    if (data && data.tag) {
      setTag({
        name: data.tag.name,
        genre: data.tag.genre,
        customTagDescription: data.tag.customTagDescription
      })
      console.log('inuseeffect', tag.customTagDescription)
      if (!tag.customTagDescription || tag.customTagDescription === '') {
        setDisabled(false)
        console.log('here', tag.customTagDescription)
      } else {
        setDisabled(true)
      }
    }
  }, [data])
  console.log('customdesc', tag.customTagDescription)
  console.log('disabledonedit', disabled)
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
  const { alert, history } = props
  const [ManageTag] = useMutation(
    UPDATE_TAG_MUTATION,
    { variables: { id, name, genre, customTagDescription, userId }
    }
  )
  return (
    <Layout>
      {loading && <p>Loading</p>}
      {error && <p>There is a problem loading your data. Please try again. ERROR: { error.message }</p>}
      <TagForm
        tag={tag}
        setTag={setTag}
        handleChange={handleChange}
        ManageTag={ManageTag}
        disabled={disabled}
        setDisabled={setDisabled}
        history={history}
        alert={alert}
        type={'edit'}
      />
    </Layout>
  )
}

export default withRouter(EditTag)
