import React, { Component } from 'react'
import cx from 'classnames'

import { caver } from 'klaytn/caver'
import Button from 'components/Button'
import './ContentHeader.scss'

const HEALTHCHECK_INTERVAL = 1000

class Header extends Component<Props> {
  state = {
    network: 'Baobab Network',
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
      network: 'Baobab Network',
    })
  }

  render() {
    const { network } = this.state
    const { cancelAction, confirmAction, removeSessionStorageButton, showSessionStoragePopup, popupOpen } = this.props
    
    return (
      <div className="Header">
        <button className={cx('remove__sessionStorage', {'show': removeSessionStorageButton })} onClick={popupOpen}>Clear Private Key</button>
        <div className={cx('Header__network', {
          'Header__network--disconnected': !network
        })}
        >
          {network || 'Disconnected'}
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
