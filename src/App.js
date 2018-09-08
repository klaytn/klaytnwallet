import React, { Component, Fragment } from 'react'

import Popup from 'components/Popup'
import Toast from 'components/Toast'
import ui from 'utils/ui'

import Header from 'components/Header'
import Nav from 'components/Nav'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  render() {
    const { children } = this.props

    return [
      <Popup key="Popup" />,
      <Toast key="Toast" />,
      <div className="App" key="App">
        <Header />
        <section className="App__section">
          <Nav />
        </section>
      </div>
    ]
  }
}

export default App
