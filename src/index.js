import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import apiUrl from './apiConfig'
import { HashRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './auth/components/SignIn'

const httpLink = createHttpLink({
  uri: `${apiUrl}/graphql`
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Authorization: Token token=${token}` : ''
    }
  }
})

// 3
// const appLink = AUTH_TOKEN => {
//   if (AUTH_TOKEN) {
//     console.log('here', authLink.concat(httpLink))
//     return authLink.concat(httpLink)
//   } else {
//     return httpLink
//   }
// }

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// 4
ReactDOM.render(
  <HashRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </HashRouter>,
  document.getElementById('root')
)

//
// const appJsx = (
//   <HashRouter>
//     <App />
//   </HashRouter>
// )
//
// ReactDOM.render(appJsx, document.getElementById('root'))
