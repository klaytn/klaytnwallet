import React, { Component } from 'react'
import cx from 'classnames'

import cookie from 'utils/cookie'
import './Modal.scss'

class Modal extends Component {
  state = {
    isCheckedHideForAWeek: false,
  }

  notShowingForAWeek = () => {
    cookie.setExpired('hideWalletScamPopup', true, 7)
    this.props.closeModal()
  }

  render() {
    const { isCheckedHideForAWeek } = this.state
    const { closeModal, isShowingModal } = this.props
    return isShowingModal && (
      <div className="Modal">
        <p className="Modal__header">Fraud Alert: <br />
          Fake Klaytn tokens on crowdsale
        </p>
        <p className="Modal__message">
          We have recently noticed that there <br />
          is an ongoing crowdsale for fake<br />
          Klaytn tokens via fraudulent websites.<br />
          We clearly notify that Klaytn is not<br />
          doing ANY sort of token sales for<br />
          public.<br />
          All official news or updates will be<br />
          announced ONLY via Kakao’s official<br />
          webpage (www.kakaocorp.com), Klaytn’s official webpage<br />
          (www.klaytn.com), and Ground X’s<br />
          official webpage (www.groundx.xyz). Any information about us distributed on other<br />
          channels is highly fraudulent, so<br />
          please beware.
        </p>
        <div className="Modal__footer">
          <div
            className={cx('Modal__footerCheckBox', {
              'Modal__footerCheckBox--checked': isCheckedHideForAWeek,
            })}
            onClick={this.notShowingForAWeek}
          />
          <p className="Modal__footerMessage">Do not show for a week</p>
          <div
            className="Modal__footerCloseButton"
            onClick={closeModal}
          />
        </div>
      </div>
    )
  }
}

export default Modal
