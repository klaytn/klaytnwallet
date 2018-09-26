import React, { Component, Fragment } from 'react'

import Popup from 'components/Popup'
import Toast from 'components/Toast'
import ui from 'utils/ui'

import Header from 'components/Header'
import Nav from 'components/Nav'
import { onit } from 'klaytn/onit'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  state = {
    isCheckedSessionStorage: false,
  }
  componentDidMount() {
    if (sessionStorage.getItem('prv')) {
      onit.klay.accounts.wallet.add(sessionStorage.getItem('prv'))
    }
    this.setState({ isCheckedSessionStorage: true })
  }

  render() {
    const { isCheckedSessionStorage } = this.state
    const { children } = this.props

    return !!isCheckedSessionStorage && [
      <Popup key="Popup" />,
      <Toast key="Toast" />,
      <div className="App" key="App">
        <Header />
        <section className="App__section">
          <Nav className="App__navSection" />
          <div className="App__contentSection">
            {children}
          </div>
        </section>
      </div>
    ]
  }
}

export default App
