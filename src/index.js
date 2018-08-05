import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import registerServiceWorker from './registerServiceWorker'
import store from './store'

import App from './App'
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
        <Route path="/create" component={WalletCreation} />
        <Route path="/access" component={WalletAccess} />
        <Route path="/access/:id" component={MyWallet} />
        <Route path="/transfer" component={WalletTransfer} />
        <Route path="/transfer/:id" component={WalletTransfer} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(renderRoutes(App), document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
