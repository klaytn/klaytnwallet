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
import { decryptAction, humanReadableChange } from 'utils/crypto'
import store from './store'
import * as tokenActions from 'actions/token'
type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  state = {
    isCheckedSessionStorage: false,
    removeSessionStorageButton: false,
    showSessionStoragePopup: false,
    networkShow: false,
  }

  componentDidMount() {
    const root = this
    const privateKeyDecrypt = decryptAction(sessionStorage.getItem('was'))
    const address = sessionStorage.getItem('address')
    if (privateKeyDecrypt) {
      if(address){
        caver.klay.accounts.wallet.add(privateKeyDecrypt, humanReadableChange(address) )
      }else{
        caver.klay.accounts.wallet.add(privateKeyDecrypt)
      }
      this.setState({ removeSessionStorageButton: true })
    }
    this.setState({ isCheckedSessionStorage: true })
    const history = syncHistoryWithStore(browserHistory, store)
    history.listen(() => {
      const privateKeyDecrypt = decryptAction(sessionStorage.getItem('was'))
      if (privateKeyDecrypt) {
        root.setState({ removeSessionStorageButton: true })
      }
      if(window.beforeunloadEvent){
        window.removeEventListener("beforeunload", beforeunloadEvent);
      }
      root.setState({ getBlockNumber: caver.klay.getBlockNumber(), networkShow: false })
    })
  }
  cancelAction = () => {
    this.setState({ showSessionStoragePopup: false })
  }
  networkSet = (value) => {
    this.setState({ networkShow: value })
  }
  confirmAction = (moveType) => {
    sessionStorage.removeItem('was')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('disclaimers')
    console.log(store.getState())
    if(moveType === true){
      store.dispatch(tokenActions.resetToken())
      sessionStorage.removeItem('savedTokenList')
    }
    if(moveType !== 'notMove'){
      browserHistory.push('/')
    }
    caver.klay.accounts.wallet.clear()
    this.setState({ showSessionStoragePopup: false, removeSessionStorageButton:false })
  }

  navClick = () => { 
    this.setState({ showSessionStoragePopup: false })
  }
  
  popupOpen = () => { 
    this.setState({ showSessionStoragePopup: true })
  }

  render() {
    const { isCheckedSessionStorage, removeSessionStorageButton, showSessionStoragePopup, networkShow } = this.state
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
              networkShow={networkShow}
              networkSet={this.networkSet}
               />
            {children}
          </div>

        </section>
      </div>,
    ]
  }
}

export default App

global.console.log(`Klaytnwallet: ${process.env.version}`)
