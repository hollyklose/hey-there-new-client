import React, { Component } from 'react'
import './App.scss'
import { Route, withRouter } from 'react-router-dom'
import ContactList from './components/ContactList'
import CreateContact from './components/CreateContact'
import EditContact from './components/EditContact'
import Home from './components/Home'
import Tags from './components/Tags'
import CreateTag from './components/CreateTag'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

// import Alert from 'react-bootstrap/Alert'
import AutoDismissAlert from './shared/autoDismissAlert/AutoDismissAlert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  // alert = (message, type) => {
  //   this.setState({ alerts: [...this.state.alerts, { message, type }] })
  // }

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert key={index} dismissible heading={alert.heading} variant={alert.variant} message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-contact' render={() => (
            <CreateContact alert={this.alert} user={user} history= {this.props.history} />
          )} />
          <AuthenticatedRoute user={user} exact path='/edit-contact/:id' render={() => (
            <EditContact alert={this.alert} user={user} history= {this.props.history} />
          )} />
          <AuthenticatedRoute user={user} exact path='/contact-list' render={() => (
            <ContactList alert={this.alert} user={user} history= {this.props.history} />
          )} />
          <AuthenticatedRoute user={user} exact path='/tags' render={() => (
            <Tags user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/manage-tags' render={() => (
            <CreateTag user={user} alert={this.alert} />
          )} />
          <Route user={user} exact path='/' render={() => (
            <Home alert={this.alert} user={user} history= {this.props.history} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default withRouter(App)
