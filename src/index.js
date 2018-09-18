import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'

import App from './App'

import DashboardPage from 'pages/DashboardPage'

import BlockList from 'components/BlockList'
import BlockDetail from 'components/BlockDetail'
import TransactionList from 'components/TransactionList'

import './index.scss'

const history = syncHistoryWithStore(browserHistory, store)

export const renderRoutes = (rootComponent) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={rootComponent}>
        <IndexRoute component={DashboardPage} />
        <Route path="/blocks" component={BlockList} />
        <Route path="/block/:blockNumberOrHash" component={BlockDetail} />
        <Route path="/transactions" component={TransactionList} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(renderRoutes(App), document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
