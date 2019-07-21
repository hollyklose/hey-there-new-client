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

const httpLink = createHttpLink({
  uri: `${apiUrl}/graphql`
})

// 3
const client = new ApolloClient({
  link: httpLink,
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
