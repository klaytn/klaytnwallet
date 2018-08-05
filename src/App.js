import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from 'components/Login'
import Loading from 'components/Loading'
import Popup from 'components/Popup'
import Toast from 'components/Toast'
import ui from 'utils/ui'
import Layout from './Layout'
import WalletStatus from './WalletStatus'
import WalletCreation from 'components/WalletCreation'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  componentDidMount() {
    // ui.openPopup({
    //   content: <Login />,
    //   login: true,
    // })
  }

  loadedOnce = false

  render() {
    const { isLoading, children } = this.props
    if (isLoading && !this.loadedOnce) {
      this.loadedOnce = true
      return <Loading wholePage />
    }

    return [
      <Popup key="popup" />,
      <Toast key="toast" />,
      <Layout key="Layout">
        {children}
      </Layout>,
    ]
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.ui.isLoading,
})

export default connect(
  mapStateToProps,
  null,
)(App)
