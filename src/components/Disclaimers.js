import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import Button from 'components/Button'
import { KLAYTN_URL_NAME } from 'constants/url'
import cx from 'classnames'
import { syncHistoryWithStore } from 'react-router-redux'
import store from '../store'
import './Disclaimers.scss'

class Disclaimers extends Component {
  state = {
    isShowingModal: false,
    isMainnet : KLAYTN_URL_NAME === 'Main Network' ? true : false, 
    isAgree: false,
    isReminderChecked: false,
    setLanguageName: 'English',
    languagObj: {
      'English':{
        button : 'I agree',
        chgeckText: 'I agree to all above.'
      },
      'Korean':{
        button : '동의',
        chgeckText: '위 내용에 동의합니다.'
      }
    }

  }

  componentDidMount() {
    if(!sessionStorage.getItem('disclaimers')){
      this.setState({ isShowingModal: true })
    }
    const history = syncHistoryWithStore(browserHistory, store)
    history.listen(() => {
      if(!sessionStorage.getItem('disclaimers')){
        this.setState({ isShowingModal: true })
      }
    })
  }
  closePopup = () => {
    this.setState({ isShowingModal: false })
    sessionStorage.setItem('disclaimers', true)
  }
  toggleChecking = () => {
    
    this.setState({
      isReminderChecked: !this.state.isReminderChecked
    },()=>{
      const { isReminderChecked } = this.state
      this.setState({ isAgree: isReminderChecked })
    })
  }
  setlLanguageNameChange = (data) => {
    const { setLanguageName } = this.state  
    this.setState({ setLanguageName: data})
  }
  
  render() {
    const { isShowingModal, isMainnet, isAgree, isReminderChecked, setLanguageName,languagObj } = this.state
    return (
      <div className={cx('Disclaimers', {
        'show': isMainnet && isShowingModal,
        'agree': isAgree,
      })}>
       
        <div className="inner_box">
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
          </div>
          <div className={cx('Disclaimers_box',{'show': setLanguageName === 'English',})}>
            <p className="Disclaimers_title">About Klaytn Wallet</p>
            <ul className="Disclaimers_list">
              <li>Klaytn Wallet is a Klaytn account management tool that connects to the Klaytn network through a web browser.</li>
              <li>Klaytn Wallet was developed to help blockchain application development and was not specifically targeted to serve end-users.</li>
              <li>Klaytn recommends that you use Klaytn Wallet on the testnet (Baobao). When you use Klaytn Wallet to manage your assets on the mainnet (Cypress), please carefully read the &#34;Disclaimer&#34; and &#34;Important Notice on Security&#34; below. We assume that you acknowledge the basic characteristics of a blockchain.</li>
            </ul>
            <p className="Disclaimers_title">Disclaimer</p>
            <ul className="Disclaimers_list">
              <li>Klaytn Wallet is provided “as-is”, without any warranty whatsoever. It does <b>NOT</b> guarantee performance of its intended function.</li>
              <li>Klaytn does not guarantee that Klaytn Wallet will perform error-free or uninterrupted or that Klaytn will correct all errors. To the extent permitted by law,
                these warranties are exclusive and there are no other express or implied warranties or conditions,
                including warranties or conditions of merchantability or fitness for a particular purpose.</li>
              <li>In no case shall Klaytn be liable for any claim, damages, or any other liability rising out of the use of Klaytn Wallet. </li>
              <li>By using Klaytn Wallet, you acknowledge that you use Klaytn Wallet at your own risk.</li>
            </ul>
            <p className="Disclaimers_title">Important Notice on Security</p>
            <ul className="Disclaimers_list">
              <li>Klaytn Wallet does <b>NOT</b> provide protection against attacks that attempt to illegally access your information through vulnerabilities of your web browser, operating system, or computer hardware.</li>
              <li>Klaytn Wallet does <b>NOT</b> store your private key or your keystore file on the Klaytn network. When you access your account,
                your private key is stored in your browser’s local storage, and is automatically deleted when you close the browser tab or when you click the Clear Private Key button.</li>
              <li>Klaytn Wallet or Klaytn <b>CANNOT</b> restore lost keystore file, private key, or Klaytn Wallet Key. Therefore, Klaytn <b>STRONGLY RECOMMENDS</b> that you securely store your keystore file,
                private key, or Klaytn Wallet Key on a separate offline storage device. Mismanagement or neglect of your information may result in irreversible loss of your assets.</li>
            </ul>
          </div>

          <div className={cx('Disclaimers_box',{'show': setLanguageName === 'Korean',})}>
            <p className="Disclaimers_title">Klaytn Wallet에 대한 안내</p>
            <ul className="Disclaimers_list">
              <li>Klaytn Wallet은 브라우저를 통해 Klaytn 네트워크와 연결되어 Klaytn 계정 관리를 돕는 도구(Tool)입니다.</li>
              <li>Klaytn Wallet은 블록체인 어플리케이션 (BApp) 개발을 지원하기 위해 만들어졌으며, 일반 사용자를 위한 서비스를 목표로 출시 되지는 않았습니다. </li>
              <li>Klaytn은 Klaytn Wallet을 테스트넷 (Baobab) 환경에서 사용할 것을 권장합니다. 메인넷 (Cypress)에서 자산을 이동하기 위해 Klaytn Wallet을 사용하고자 한다면, 아래 &#34;책임의 한계&#34; 와 &#34;보안에 대한 중요 알림&#34; 을 반드시 숙독하시기 바랍니다. Klaytn Wallet을 사용하려면 블록체인에 대한 기본적인 이해가 반드시 필요합니다.</li>
            </ul>
            <p className="Disclaimers_title">책임의 한계</p>
            <ul className="Disclaimers_list">
              <li>Klaytn은 Klaytn Wallet을 현재 상태대로 제공하며 기능의 정상적 수행을 포함하여 그 어떠한 것도 보증하지 않습니다.</li>
              <li>Klaytn은 Klaytn Wallet의 장애 또는 외부의 간섭 및 영향 없는 정상적 수행을 보장하지 않으며 Klaytn Wallet 상에서 발견된<br />
                  장애를 수정할 책임을 지지 않습니다.
              </li>
              <li>Klaytn은 어떠한 경우에도 Klaytn Wallet의 사용으로 인하여 귀하에게 직접 또는 간접적으로 발생하는 피해 및 물적 손실 등에 대한<br />
                  배상 책임을 지지 않습니다.
              </li>
              <li>귀하는 Klaytn Wallet의 사용에 동의함으로써 스스로의 결정에 따라 위와 같은 위험을 인식하고 부담한 것으로 간주됩니다.</li>
            </ul>
            <p className="Disclaimers_title"><b>보안에 대한 중요 알림</b></p>
            <ul className="Disclaimers_list">
              <li>Klaytn Wallet은 귀하의 웹 브라우저, 컴퓨터 운영체제, 또는 컴퓨터 장비의 보안 취약점을 통해 귀하의 정보를 탈취하려하는 공격으로부터<br />
                  <b>귀하의 정보를 보호할 수 없습니다.</b>
              </li>
              <li>Klaytn Wallet은 <b>귀하의 private key 또는 keystore file을 Klaytn network 에 저장하지 않습니다. </b>
                  귀하가 귀하의 계정에 액세스 할 때  private key는<br />귀하의 브라우저 내 local storage에 저장되며, 브라우저가 종료되거나 Clear Private Key 버튼이 클릭될 경우 자동적으로 삭제됩니다.
              </li>
              <li>Klaytn Wallet 또는 Klaytn은 귀하의 keystore file, private key, 또는 Klaytn Wallet Key가 분실될 경우 이를 복구할 수 없습니다.<br />
                  따라서 Klaytn은 귀하가 keystore file, private key, 또는 Klaytn Wallet Key를 <b>반드시 네트워크에 연결되지 않은 저장매체에 보관할 것을 강력히 권장합니다.<br />
                  귀하의 관리 미숙 또는 소홀로 인하여 정보 손실이 발생할 경우, 귀하의 디지털 자산에 돌이킬 수 없는 피해가 발생할 수 있습니다.</b>
              </li>
            </ul>
          </div>
          <div className="Disclaimers_footer">
            <div className="Disclaimers_agree">
              <div 
                className={cx("Disclaimers__checkbox", {
                  "Disclaimers__checkbox--checked": isReminderChecked,
                  }
                )}
                onClick={this.toggleChecking} 
              />
              <div className="Disclaimers__description" onClick={this.toggleChecking} >{languagObj[setLanguageName]['chgeckText']}</div>
            </div>
            <Button
                title={languagObj[setLanguageName]['button']}
                className="Disclaimers_agree__button"
                onClick={this.closePopup}
                disabled={!isAgree}
              />
          </div>
        </div>  
     </div>
    )
  }
}

export default Disclaimers
