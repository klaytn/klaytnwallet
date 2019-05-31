import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { caver } from 'klaytn/caver'
import Button from 'components/Button'
import './ContentHeader.scss'
import ui from 'utils/ui'
import store from  '../store'
import {  KLAYTN_URL_NAME, KLAYTN_MAINNET_URL, KLAYTN_BAOBAB_URL } from 'constants/url'
const HEALTHCHECK_INTERVAL = 1000
const CRYPO_PASSWORD = process && process.env.CRYPO_PASSWORD
console.log(KLAYTN_URL_NAME)
class Header extends Component<Props> {
  state = {
    network: KLAYTN_URL_NAME,
    prevBlockNumber: null,
  }

  sameBlockNumberCount = 0

  healthCheck = async () => {
    const blockNumber = await caver.klay.getBlockNumber()

    if (this.sameBlockNumberCount > 5) {
      this.setState({ network: false })
      this.sameBlockNumberCount = 0
      return
    }

    if (blockNumber == this.state.prevBlockNumber) {
      this.sameBlockNumberCount++
      return
    }

    this.sameBlockNumberCount = 0
    this.setState({
      prevBlockNumber: blockNumber,
    })
  }
  componentWillReceiveProps (preprops){
    const {removeSessionStorageButton } = this.props
    if(preprops.removeSessionStorageButton !== removeSessionStorageButton){

    }
  }
  dropDownClick = () => {
    const { networkShow, networkSet } = this.props
    if(networkShow) {
      networkSet(false)
    } else {
      networkSet(true)
    }
  }
  handleSelect = (value) => {
    const { networkSet } = this.props
    if(value){
      window.open(value)
    }else{
      networkSet(false)
    }   
  }
  render() {
    const { network } = this.state
    const { cancelAction, networkShow, confirmAction, removeSessionStorageButton, showSessionStoragePopup, popupOpen, keyRemove } = this.props
    let networkList
    if(keyRemove){
      confirmAction('notMove')
      ui.keyRemoveEnd()
    }
    if(KLAYTN_URL_NAME === 'Main Network'){
      networkList = [{value: '', name: 'Main Network'}, {value: KLAYTN_BAOBAB_URL, name: 'Baobab Network'}]
    }else{
      networkList = [{value: '', name: 'Baobab Network'},{value: KLAYTN_MAINNET_URL, name: 'Main Network'}]
    }
    return (
      <div className="Header">
        <button className={cx('remove__sessionStorage', {'show': removeSessionStorageButton })} onClick={popupOpen}>Clear Private Key</button>
        <div className="Header__network__box">
          <div className={cx('Header__network', {
            'Header__network--disconnected': !network
          })}
          onClick={KLAYTN_URL_NAME === 'Main Network' ? this.dropDownClick :()=>{}} 
          >
            {network || 'Disconnected'}
          </div>
          <ul className={cx('network__dropdown', {'show': networkShow})}>
            {networkList.map(({ value, name }) => (
              <li key={name} onClick={()=>{this.handleSelect(value)}} className={cx('network__dropdown__item', {'on': KLAYTN_URL_NAME == name})}>{name}</li>
            ))}
          </ul>
            
        </div>
        <div className={cx('createMainPopup', { 'show': showSessionStoragePopup })}>
          <div className="createMainPopup__inner">
            <span  className="popup__title">Do you really want to clear your private key from your browser?</span>
            <p className="popup__message2">
              This action will delete your private key stored in your browser’s storage.
              You’ll need to type in your private key again to check your balance or send KLAY / token.</p>
            <div className="popup__bottom__box">
              <Button
                className="popup__btn"
                title={'Cancel'}
                onClick={cancelAction}
                gray={true}
              />
              <Button
                className="popup__btn"
                onClick={confirmAction}
                title={'Confirm'}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const removeSessionStorage = (state) => {
  return {
    keyRemove: state.ui.keyRemove,
  }
}
export default connect(
  removeSessionStorage,
)(Header)
