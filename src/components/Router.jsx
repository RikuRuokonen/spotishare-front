import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './App'
import Login from './Login'
import Session from './Session'

const history = createBrowserHistory()

const SpotishareRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/(session|s)/:id" component={Session} />
      <Route path="/login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
)

export default SpotishareRouter
