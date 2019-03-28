import React, { Component } from 'react'
import cx from 'classnames'

import cookie from 'utils/cookie'

import './Modal.scss'

// TODO: Refactoring using withModal enhancer.
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
        <p className="Modal__header">
        *Fraud Alert: Fake KLAY on crowdsale<br />
        *사기 주의 안내 : 클레이튼 사칭 코인 판매 피해 주의
        </p>
        <p className="Modal__message">
        We clearly notify that there is no way for individuals to purchase or invest in KLAY.<br />
        The investors and firms that have made official contracts with Klaytn are not able to resell KLAY to any individuals. There has not been any kind of sales through agencies in the past and in the future as well.<br />
        Any solicitation of individual investors for the sale of KLAY is an obvious fraud, so please beware of potential financial damage.<br />
        We are considering to take any possible civil and/or criminal actions against those incurring damage to our value, reputation, and products.<br/>
        <br />
        안녕하세요, Klaytn에서 공지드립니다.<br />
        최근 Klaytn의 코인인 KLAY를 사칭하여 코인 투자자를 모집하는 사기 행위가 발견되었습니다.<br />
        개인은 KLAY를 어떠한 방법으로도 취득할 수 않음을 거듭 안내드립니다.<br />
        Klaytn과 투자 계약을 맺은 기업과 기관 투자자들은 개인을 상대로 KLAY의 재판매는 원천적으로 불가능하며, 에이전시 등을 통한 KLAY 판매는 진행 된 경우가 없으며 향후에도 별도의 계획은 없습니다.<br />
        KLAY 판매를 위한 개인 투자자의 모집 행위는 명백한 사칭 사기임을 다시 한번 강조드리며, 관련 피해가 발생하지 않도록 각별한 주의 당부드립니다. Klaytn 및 KLAY를 사칭함으로써 Klaytn의 가치와 명예를 훼손하는 행위에 관련하여서는 엄중하게 민/형사상 조치를 취할 것을 검토 중입니다.

        </p>
        <div className="Modal__footer">
          <div
            className={cx('Modal__footerCheckBox', {
              'Modal__footerCheckBox--checked': isCheckedHideForAWeek,
            })}
            onClick={this.notShowingForAWeek}
          />
          <p className="Modal__footerMessage">Do not show for a week.</p>
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
