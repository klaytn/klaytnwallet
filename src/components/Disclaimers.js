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
  render() {
    const { isShowingModal, isMainnet, isAgree, isReminderChecked } = this.state
    return (
      <div className={cx('Disclaimers', {
        'show': isMainnet && isShowingModal,
        'agree': isAgree,
      })}>
       
        <div className="inner_box">
          <div className="Disclaimers_box">
            <p className="Disclaimers_title">About Klaytn Wallet</p>
            <ul className="Disclaimers_list">
              <li>Klaytn Wallet is a Klaytn account management tool that connects to the Klaytn network through a web browser.</li>
              <li>Klaytn Wallet is intended for blockchain application (BApp) development purpose only.
                Klaytn Wallet should <b>NOT</b> be used on the mainnet for any personal or commercial use other than for such BApp development purpose.</li>
              <li>Klaytn recommends that you use Klaytn Wallet on <b>the testnet (Baobab) ONLY.</b></li>
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
              <li>Klaytn Wallet does <b>NOT</b> provide protection against attacks that attempt to illegally access your sensitive information through vulnerabilities of your web browser, operating system, or computer hardware.</li>
              <li>Klaytn Wallet does <b>NOT</b> store your private key or your keystore file on the Klaytn network. When you access your account,
                your private key is stored in your browser’s local storage, and is automatically deleted when you close the browser tab or when you click the Clear Private Key button.</li>
              <li>Klaytn Wallet or Klaytn <b>CANNOT</b> restore lost keystore file, private key, or Klaytn Wallet Key. Therefore, Klaytn <b>STRONGLY RECOMMENDS</b> that you securely store your keystore file,
                private key, or Klaytn Wallet Key on a separate offline storage device. Mismanagement or neglect of your sensitive information may result in irreversible loss of your assets.</li>
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
              <div className="Disclaimers__description" onClick={this.toggleChecking} >I agree to all above.</div>
            </div>
            <Button
                title="I agree"
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
