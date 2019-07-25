import React, { Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Layout from './Layout'

const authenticatedOptions = (
  <Fragment>
    <h4>You have been working really hard!</h4>
    <p>Do you want to <Link to='/create-contact/'>
    create a new contact</Link> or <Link to='/contact-list'>go back to your list</Link>?<br />
    </p>
    <h4 style={{ color: 'purple' }}>Or would you like a little distraction first?</h4>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/94PLgLKcGW8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <h4>Do you have trouble staying in touch with people regularly?</h4>
    <p>Look no further! <Link to='/sign-up'>Sign up</Link> or <Link to='/sign-in'>sign in</Link>!</p>
  </Fragment>
)

const Home = ({ user }) => (
  <Layout>
    { user ? authenticatedOptions : unauthenticatedOptions }
  </Layout>
)

export default withRouter(Home)
