import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import { caver } from 'klaytn/caver'
import Button from 'components/Button'
import './ContentHeader.scss'
import {  KLAYTN_URL_NAME, KLAYTN_MAINNET_URL, KLAYTN_BAOBAB_URL } from 'constants/url'
const HEALTHCHECK_INTERVAL = 1000
const CRYPO_PASSWORD = process && process.env.CRYPO_PASSWORD
console.log(KLAYTN_URL_NAME)
class Header extends Component<Props> {
  state = {
    network: KLAYTN_URL_NAME,
    prevBlockNumber: null,
    showDropdown: false,
  }

  sameBlockNumberCount = 0


  networkList =()=>{
    if(KLAYTN_URL_NAME === 'Main Network'){
      return ``
    }else{
      return `<li><a href="${KLAYTN_BAOBAB_URL}">Baobab Network</a></li><li><a href="${KLAYTN_MAINNET_URL}">Main Network</a></li>`
    }
  }
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
      network: 'Baobab Network',
    })
  }
  componentWillReceiveProps (){
    this.setState({showDropdown : false})
  }
  dropDownClick = () => {
    const { showDropdown } = this.state
    console.log('432423423')
    if(showDropdown) {
      this.setState({showDropdown : false})
    } else {
      this.setState({showDropdown : true})
    }
  }
  handleSelect = (value) => {
    if(value){
      window.open(value)
    }else{
      this.setState({showDropdown : false})
    }
    
  }
  render() {
    const { network, showDropdown } = this.state
    const { cancelAction, confirmAction, removeSessionStorageButton, showSessionStoragePopup, popupOpen } = this.props
    let networkList

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
          // onClick={this.dropDownClick} 
          >
            {network || 'Disconnected'}
          </div>
          <ul className={cx('network__dropdown', {'show': showDropdown})}>
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

export default Header
