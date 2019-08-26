import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'

const AutoDismissAlert = props => {
  const [show, setShow] = useState(true)

  // The below returned function is performed at the equivalent of componentWillUnmount
  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false)
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // componentWillUnmount () {
  //   clearInterval(this.timer)
  // }

  const handleClose = () => setShow(false)

  const { variant, heading, message } = props
  return (
    <Alert
      dismissible
      show={show}
      variant={variant}
      onClose={handleClose}
    >
      <div className="container">
        <Alert.Heading>
          {heading}
        </Alert.Heading>
        <p className="alert-body">{message}</p>
      </div>
    </Alert>
  )
}

export default AutoDismissAlert
