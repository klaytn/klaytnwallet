import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Popup from 'components/Popup'
import Toast from 'components/Toast'
import ContentHeader from 'components/ContentHeader'
import Nav from 'components/Nav'
import cx from 'classnames'
import { caver } from 'klaytn/caver'
import './App.scss'
import { syncHistoryWithStore } from 'react-router-redux'
import { decryptAction } from 'utils/crypto'
import store from './store'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  state = {
    isCheckedSessionStorage: false,
    removeSessionStorageButton: false,
    showSessionStoragePopup: false,
  }

  componentDidMount() {
    const root = this
    const privateKeyDecrypt = decryptAction(sessionStorage.getItem('was'))
    if (privateKeyDecrypt) {
      caver.klay.accounts.wallet.add(privateKeyDecrypt)
      this.setState({ removeSessionStorageButton: true })
    }
    this.setState({ isCheckedSessionStorage: true })
    const history = syncHistoryWithStore(browserHistory, store)
    history.listen(() => {
      const privateKeyDecrypt = decryptAction(sessionStorage.getItem('was'))
      if (privateKeyDecrypt) {
        root.setState({ removeSessionStorageButton: true })
      }
    })
  }

  cancelAction = () => {
    this.setState({ showSessionStoragePopup: false })
  }

  confirmAction = (moveType) => {
    sessionStorage.removeItem('was')
    sessionStorage.removeItem('address')
    if(moveType !== 'notMove'){
      browserHistory.push('/')
    }
    this.setState({ showSessionStoragePopup: false, removeSessionStorageButton:false })
  }

  navClick = () => { 
    this.setState({ showSessionStoragePopup: false })
  }
  
  popupOpen = () => { 
    this.setState({ showSessionStoragePopup: true })
  }

  render() {
    const { isCheckedSessionStorage,  removeSessionStorageButton, showSessionStoragePopup } = this.state
    const { children } = this.props
    return !!isCheckedSessionStorage && [
      <Popup key="Popup" />,
      <Toast key="Toast" />,
      <div className="App" key="App">      
        <section className={cx('App__section', {'App__section__mainPage': browserHistory.getCurrentLocation().pathname === '/'})}>
          <Nav className="App__navSection" onClick={this.navClick} />
          <div className="App__contentSection">
            <ContentHeader 
              cancelAction={this.cancelAction} 
              confirmAction={this.confirmAction}
              removeSessionStorageButton={removeSessionStorageButton} 
              showSessionStoragePopup={showSessionStoragePopup}
              popupOpen={this.popupOpen}
               />
            {children}
          </div>

        </section>
      </div>,
    ]
  }
}

export default App
