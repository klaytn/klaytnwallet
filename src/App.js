import React, { Component } from 'react'

import Popup from 'components/Popup'
import Toast from 'components/Toast'
import WalletCreation from 'components/WalletCreation'
import Layout from './Layout'
import WalletStatus from './WalletStatus'
import ui from 'utils/ui'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  render() {
    return [
      <Popup key="popup" />,
      <Toast key="toast" />,
      <Layout key="Layout">
        {this.props.children}
      </Layout>,
    ]
  }
}

export default App
