import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import { onit } from 'klaytn/onit'
import EditButton from 'components/EditButton'
import Input from 'components/Input'
import Button from 'components/Button'
import { pipe } from 'utils/Functional'
import BN from 'bignumber.js'
import './PageAlertPopup.scss'

class PageAlertPopup extends Component<Props> {
  
  constructor() {
    super()
    this.wallet = onit.klay.accounts.wallet[0]
    this.state = {
      balance: '0',
      mainNetSite: true,
      popupStyle: null,

    }
  }
  updateBalance = () => {
    if(this.wallet ){
      onit.klay.getBalance(this.wallet.address)
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

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps.balance, this.props.balance)
  //   if (prevProps.balance !== this.props.balance) {
  //     this.updateBalance();
  //   }
  // }

  

  render() {
    const {
      className,
      popupStyle,
      goFaucet,
    } = this.props
    
    const { isEditing, balance, mainNetSite } = this.state


    return (
      <div className={cx('createMainPopup', {
        'show': !this.wallet || balance == '0'
      })}>
        {!this.wallet && (
          <div className="createMainPopup__inner widthType">
            <span  className="popup__title">You need to Access Your Account for This Action</span>
            <p className="popup__message2">Please check your Test_KLAY balance at
              <Link to="/access" className="info_link" >View Account Info</Link>
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
        {this.wallet && balance == '0' && mainNetSite && (
          <div className="createMainPopup__inner widthType">
            <span  className="popup__title">You Need More KLAY to Customize Address</span>
            <p className="popup__message2">Creating a custom address account requires KLAY. You can check your KLAY balance at View Account Info.
              <Link to="/access" className="info_link" >View Account Info</Link>
            </p>
            
            <div className="popup__bottom__box">
            <Link to="/access?next=faucet" className="info_link" ><Button
              className="popup__btn"
              key='Go Back'
              title={'Go Back'}
            /></Link>
            </div>
          </div>
        )}
        {this.wallet && balance == '0' && !mainNetSite && (
          <div className="createMainPopup__inner">
            <Input
              name="value"

              className="TransferForm__input TransferForm__valueInput"
              label="Get test KLAY"
              placeholder="0.000000"
              autoComplete="off"
              unit="Test_KLAY"
              value="10"
              errorMessage="How does the Klay Faucet work?"
            />
            <p className="popup__message">Please run the Test_KLAY Faucet to receive a small amount of Test_KLAY for testing. </p>
            <div className="popup__bottom__box"><Button
              className="popup__btn"
              key='Get Test_KLAY'
              title={'Get Test_KLAY'}
              onClick={goFaucet}
            /></div>
          </div>
        )}
        
     </div>
    )
  }
}


export default PageAlertPopup
