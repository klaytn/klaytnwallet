import React, { Component } from 'react'
import cx from 'classnames'

import cookie from 'utils/cookie'
import Button from 'components/Button'

import './Modal.scss'


// TODO: Refactoring using withModal enhancer.
class Modal extends Component {
  state = {
    isCheckedHideForAWeek: false,
    setLanguageName: 'English',
  }

  notShowingForAWeek = () => {
    cookie.setExpired('hideWalletScamPopup', true, 7)
    this.props.closeModal()
  }

  setlLanguageNameChange = (data) => {
    const { setLanguageName } = this.state  
    this.setState({ setLanguageName: data})
  }
  mainOpenModel = () => {
    document.getElementsByClassName('popup__dim')[0].classList.add('open');
    document.getElementsByClassName('klay__alertPopup')[0].classList.add('open');
  }
  mainCloseModel = () => {
    document.getElementsByClassName('popup__dim')[0].classList.remove('open');
    document.getElementsByClassName('klay__alertPopup')[0].classList.remove('open');
  }
  render() {
    const { isCheckedHideForAWeek, setLanguageName } = this.state
    const { closeModal, isShowingModal } = this.props

    return (
      <div className="Modal fraudPopup">
            <button className="klay__alertPopup__button" onClick={this.mainOpenModel}>
              <span className="button__alert__icon">!</span>
              Fraud Alert: Fake KLAY on crowdsale
              <img className="button__link__icon" src="/static/images/icon-link-off.svg"/>
            </button>
        <div className="popup__dim" onClick={this.mainCloseModel}></div>    
        <div className="klay__alertPopup">
          
          <div className="languageChange__button_list">  
            <Button 
              className={cx('languageChange__button',{'on': setLanguageName === 'English',})}                
              onClick={()=>{this.setlLanguageNameChange('English')}}
              title='ENGLISH'
            />
            <Button 
              className={cx('languageChange__button',{'on': setLanguageName === 'Korean',})}
              onClick={()=>{this.setlLanguageNameChange('Korean')}}
              title='KOREAN'
            />
            <Button 
              className={cx('languageChange__button',{'on': setLanguageName === 'China',})}
              onClick={()=>{this.setlLanguageNameChange('China')}}
              title='CHINESE'
            />
            <button
              className="close__button"
              onClick={this.mainCloseModel}
            ></button>
          </div>
          <div className={cx('Modal__inner',{'show': setLanguageName === 'English'})}>
            <div className="Modal__header">
            Fraud Alert: Fake KLAY on crowdsale
            </div>
            <div className="Modal__message">
              <p className="Modal__line__text">
              We, Klaytn, have recently noticed that there is an ongoing crowdsale for fake KLAY (Klaytn Token) via fraudulent channels.
              </p>
              <p className="Modal__line__text">
                <b className="Modal__text__bold">We clearly notify that:</b>
              </p>
              <div className="Model__danger__box">
                <p className="Modal__line__text">
                  1. We are <b className="Modal__text__bold">not making ANY sort of token sales</b> for the public.
                </p>
                <p className="Modal__line__text">
                  2. There is <b className="Modal__text__bold">no way for individuals to purchase or invest</b> in KLAY.
                </p>
                <p className="Modal__line__text">
                  3. <b className="Modal__text__bold">Any resale of KLAY</b> by anyone is also currently <b className="Modal__text__bold">prohibited.</b>
                </p>
                <p className="Modal__line__text">
                  4. KLAY are <b className="Modal__text__bold">not able for any type of sales</b> including resale to individuals. 
                </p>
                <p className="Modal__line__text">
                  5. There has <b className="Modal__text__bold">not been any kind of KLAY sales through agencies</b> in the past and in the future as well unless notified by our official website.
                </p>
              </div>
              <p className="Modal__line__text">
                Any solicitation of individual investors for the sale of KLAY is an obvious fraud, so please beware of potential financial damage.
              </p>
              <p className="Modal__line__text">
                We are considering to take any possible civil and/or criminal actions against those incurring damage to our value, reputation, and products.
              </p>
            </div>
          </div>
          <div className={cx('Modal__inner',{'show': setLanguageName === 'Korean'})}>
            <div className="Modal__header">
              사기 주의 안내 : Klaytn 사칭 토큰 판매 피해 주의
            </div>
            <div className="Modal__message">
              <p className="Modal__line__text">
                안녕하세요, Klaytn에서 공지드립니다. Klaytn은 최근 Klaytn의 토큰인 KLAY를 사칭하여 코인 투자자를 모집하는 사기 행위를 다수 발견하였습니다.
              </p>
              <p className="Modal__line__text">
                <b className="Modal__text__bold">이와 관련하여, 아래와 같이 안내드립니다.</b>
              </p>
              <div className="Model__danger__box">
                <p className="Modal__line__text">
                  1. Klaytn은 <b className="Modal__text__bold">대중에게 어떤 종류의 토큰 판매도 하지 않습니다.</b>
                </p>
                <p className="Modal__line__text">
                  2. <b className="Modal__text__bold">개인</b>은 KLAY를 어떠한 방법으로도 <b className="Modal__text__bold">구매나 투자할 수 없음</b>을 안내드립니다.
                </p>
                <p className="Modal__line__text">
                  3. 누구든지<b className="Modal__text__bold">KLAY를 재판매하는 것은 현재 금지</b>되어 있습니다.
                </p>
                <p className="Modal__line__text">
                  4. <b className="Modal__text__bold">KLAY</b>는 개인에 대한 재판매를 포함한 <b className="Modal__text__bold">모든 유형의 판매에 사용할 수 없습니다.</b>
                </p>
                <p className="Modal__line__text">
                  5. 공식 홈페이지에서 별도로 통지하지 않는 한, Klaytn은 <b className="Modal__text__bold">대리인 또는 제3자를 통해 KLAY를 판매하지 않으며</b> 앞으로도 판매하지 않을 것 입니다.
                </p>
              </div>
              <p className="Modal__line__text">
                KLAY 판매에 대한 개인 투자자 모집 행위는 명백한 사기임을 다시 한 번 강조드리며, 관련 피해가 발생하지 않도록 주의 당부드립니다.
              </p>
              <p className="Modal__line__text">
              아울러 Klaytn 및 KLAY를 사칭함으로써 Klaytn의 가치와 명예를 훼손하는 행위에 관련하여서는 엄중하게 민/형사상 법적 조치를 취할 것을 검토 중입니다.
              </p>
            </div>
            
          </div>
          <div className={cx('Modal__inner',{'show': setLanguageName === 'China',})}>
            <img className="fraud__chinese" src="/static/images/fraud-chinese.svg"/>
          </div>
        </div>        
      </div>
    )
  }
}

export default Modal
