import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { caver } from 'klaytn/caver'
import Button from 'components/Button'
import './ContentHeader.scss'
import ui from 'utils/ui'
import { pipe } from 'utils/Functional'
import {  KLAYTN_URL_NAME, KLAYTN_MAINNET_URL, KLAYTN_BAOBAB_URL } from 'constants/url'
const HEALTHCHECK_INTERVAL = 1000
const CRYPO_PASSWORD = process && process.env.CRYPO_PASSWORD
console.log(KLAYTN_URL_NAME)
class Header extends Component<Props> {
  state = {
    network: KLAYTN_URL_NAME,
    prevBlockNumber: null,
    isReminderChecked: false,
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
  toggleChecking = () => {
    this.setState({
      isReminderChecked: !this.state.isReminderChecked
    },()=>{
      const { isReminderChecked } = this.state
      this.setState({ isAgree: isReminderChecked })
    })
  }
  resetCheck = () => {
    this.setState({
      isReminderChecked: false
    })
  }
  render() {
    const { network, isReminderChecked } = this.state
    const { cancelAction, networkShow, confirmAction, removeSessionStorageButton, showSessionStoragePopup, popupOpen, keyRemove } = this.props
    let networkList
    if(keyRemove){
      confirmAction('notMove')
      ui.keyRemoveEnd()
    }
    if(KLAYTN_URL_NAME === 'Main Network'){
      networkList = [{value: '', name: 'Main Network'}, {value: KLAYTN_BAOBAB_URL, name: 'Baobab Testnet'}]
    }else{
      networkList = [{value: '', name: 'Baobab Testnet'},{value: KLAYTN_MAINNET_URL, name: 'Main Network'}]
    }
    return (
      <div className="Header">
        <button className={cx('remove__sessionStorage', {'show': removeSessionStorageButton })} onClick={popupOpen}>Clear Private Key</button>
        <div className="Header__network__box">
          <div className={cx('Header__network', {
            'Header__network--activation':  KLAYTN_URL_NAME === 'Main Network',
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
        <div className={cx('createMainPopup type1', { 'show': showSessionStoragePopup })}>
          <div className="createMainPopup__inner">
            <span  className="popup__title">Do you really want to clear your private key from your browser?</span>
            <div className="popup__message2">

              <span>This action will delete your private key stored in your browser’s storage.
              You’ll need to type in your private key again to check your balance or send KLAY / token.</span>
              <div className="Disclaimers_agree">
                <div 
                  className={cx("Disclaimers__checkbox", {
                    "Disclaimers__checkbox--checked": isReminderChecked,
                    }
                  )}
                  onClick={this.toggleChecking} 
                />
                <div className="Disclaimers__description" onClick={this.toggleChecking} >Check to also clear registered tokens</div>
              </div>
            </div>
              
            <div className="popup__bottom__box">
              <Button
                className="popup__btn"
                title={'Cancel'}
                onClick={pipe(this.resetCheck, cancelAction)}
                gray={true}
              />
              <Button
                className="popup__btn"
                onClick={pipe(this.resetCheck, ()=>{confirmAction(isReminderChecked)})}
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
