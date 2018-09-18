import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'

import App from './App'
import WalletCreation2 from 'components/WalletCreation2'
import WalletAccess2 from 'components/WalletAccess2'
import WalletTransfer2 from 'components/WalletTransfer2'
import KlayFaucet from 'components/KlayFaucet'
import Landing from 'components/Landing'
import MyWallet from 'components/MyWallet'

import './index.scss'

const history = syncHistoryWithStore(browserHistory, store)

export const renderRoutes = (rootComponent) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={rootComponent}>
        <IndexRoute component={Landing} />
        <Route path="/create" component={WalletCreation2} />
        <Route path="/access" component={WalletAccess2} />
        <Route path="/access/:id" component={MyWallet} />
        <Route path="/transfer" component={WalletTransfer2} />
        <Route path="/transfer/:id" component={WalletTransfer2} />
        <Route path="/faucet" component={KlayFaucet} />
        <Route path="/faucet/:address" component={KlayFaucet} />
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
