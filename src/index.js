import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'

import App from './App'
import WalletCreation2 from 'components/WalletCreation2'
import WalletAccess2 from 'components/WalletAccess2'

import WalletCreation from 'components/WalletCreation'
import WalletAccess from 'components/WalletAccess'
import WalletTransfer from 'components/WalletTransfer'
import MyWallet from 'components/MyWallet'

import './index.scss'

const history = syncHistoryWithStore(browserHistory, store)

export const renderRoutes = (rootComponent) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={rootComponent}>
        <IndexRoute component={WalletCreation2} />
        <Route path="/create" component={WalletCreation2} />
        <Route path="/access" component={WalletAccess2} />
        <Route path="/access/:id" component={MyWallet} />
        <Route path="/transfer" component={WalletTransfer} />
        <Route path="/transfer/:id" component={WalletTransfer} />
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
