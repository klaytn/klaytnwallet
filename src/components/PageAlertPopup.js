import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import { caver } from 'klaytn/caver'
import EditButton from 'components/EditButton'
import Input from 'components/Input'
import Button from 'components/Button'
import { pipe } from 'utils/Functional'
import BN from 'bignumber.js'
import './PageAlertPopup.scss'
import { KLAYTN_KLAY_UINT } from 'constants/url'
import { HRAMADEVALUE } from 'utils/crypto'

class PageAlertPopup extends Component<Props> {
  
  constructor() {
    super()
    this.wallet = caver.klay.accounts.wallet[0]
    this.state = {
      balance: '0',
      mainNetSite: true,
      popupStyle: null,

    }
  }
  updateBalance = () => {
    const address = sessionStorage.getItem('address')
    
    if(this.wallet ){
      caver.klay.getBalance(address ? address : this.wallet.address)
      .then((balance) => {
        this.setState({
          balance:balance,
        })
       
      })
    }
    
  }
  componentDidMount() {
    this.updateBalance();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.balance !== this.props.balance) {
      this.updateBalance();
    }
  }

  

  render() {
    const {
      className,
      popupStyle,
      goFaucet,
    } = this.props
    
    const { isEditing, balance, mainNetSite } = this.state


    return (
      <div className={cx('createMainPopup', {
        'show': !this.wallet || balance < HRAMADEVALUE
      })}>
        {!this.wallet && (
          <div className="createMainPopup__inner widthType">
            <span  className="popup__title">Interested In Customizing Your Account Address?</span>
            <p className="popup__message2">To create a new account with custom address, you need some KLAY to send a transaction. Please gain access to an existing account with KLAY balance through View Account Info.
            </p>
            <div className="popup__bottom__box">
            <Link to="/access" className="info_link" ><Button
              className="popup__btn"
              key='View Account Info'
              title={'View Account Info'}
            /></Link>
            </div>
            
          </div>
        )}
        {this.wallet && balance < HRAMADEVALUE &&  (
          <div className="createMainPopup__inner heightType">
            <span  className="popup__title">Insufficient {KLAYTN_KLAY_UINT} Balance</span>
            <div className="popup__message2">Creating new account with custom address requires following amount of {KLAYTN_KLAY_UINT}:<br />
              <ul className="item__list">
                <li><span className="item__name">You Need</span><span className="item__value">100 {KLAYTN_KLAY_UINT} + tx Fee</span></li>
                <li><span className="item__name">Your Balance</span><span className="item__value alert__text">{BN(balance).multipliedBy(0.000000000000000001).toFixed()} {KLAYTN_KLAY_UINT}</span></li>
              </ul>
            </div>
            
            <div className="popup__bottom__box">
            <Link to="/access?next=faucet" className="info_link" ><Button
              className="popup__btn"
              key='Go Back'
              title={'Go Back'}
            /></Link>
            </div>
          </div>
        )}        
     </div>
    )
  }
}


export default PageAlertPopup
