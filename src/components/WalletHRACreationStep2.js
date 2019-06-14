import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download, copy } from 'utils/misc'
import { caver } from 'klaytn/caver'
import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import cx from 'classnames'
import { changeKlayUnit } from 'utils/crypto'
import Button from 'components/Button'


type Props = {

}
const TransferTotalItem = ({
  title,
  value,
  key,
}) => (
  <div className="TransferTotal__item" key={title}>
    <span className="TransferTotal__itemTitle">{title}</span>
    <span className="TransferTotal__itemValue">{value}</span>
  </div>
)
const doNotReload=()=>{
  if( (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82))|| (event.keyCode == 116) ){
  event.keyCode = 0;
  event.cancelBubble = true;
  event.returnValue = false;
  }
}
window.beforeunloadEvent = (event)=>{
  event.returnValue = "Do you want to leave the page?";
}
class WalletHRACreationStep2 extends Component<Props> {

  constructor(props) {
    super(props)
   
    const { receiptWallet } = this.props
    this.state = {
      receiptWallet,
      isAlert: false,
      popupShow: false,
      buttonClick: false,
    }
    document.onkeydown = doNotReload;
    
    window.addEventListener("beforeunload", beforeunloadEvent);

  }

  menuClick=()=>{
    this.setState({ isAlert: true})
  }
  clearReload=()=>{
    document.onkeydown = '';
    window.removeEventListener("beforeunload", beforeunloadEvent);
  }
  closeSet =()=>{
    this.setState({ isAlert: false})
  }
  
  clickEvent = () => {
    this.setState({ popupShow: true })
  }
  moveMain = () => {
    browserHistory.push('/')
  }
  popupClose = () => {
    this.setState({ buttonClick: false})
    const { handleStepMove } = this.props
    const setHandleStepMove = handleStepMove(3)
    if (this.$input)
    copy(this.$input)
    this.clearReload()
    setHandleStepMove()
  }

  nextStepButtonClick = () => {
    const { popupShow } = this.state
    const { handleStepMove } = this.props
    const setHandleStepMove = handleStepMove(3)
    if(!popupShow){
      this.setState({ buttonClick: true})
    }else{
      this.clearReload()
      setHandleStepMove()
    }
  }
  render() {
    const { receiptWallet, isAlert, buttonClick } = this.state
    const { handleStepMove, HRAprivateKey} = this.props

    return (
      <WalletCreationStepPlate
        className="WalletCreationStep2"
        stepName="STEP 2"
        title="Please Save Your Klaytn Wallet Key"
        description={(
          <Fragment>
            Your new account has been successfully created.<br />
            Please copy and securely store the Klaytn Wallet Key below:
          </Fragment>
        )}
        render={() => (
          <InputCopy
            value={HRAprivateKey}
            className="textarea__show"
            label="Klaytn Wallet Key"
            clickEvent={this.clickEvent}
            styleType="twoLine"
          />
        )}
        TransferTotalItem={[
          { title:"Account Address", value: caver.utils.hexToUtf8(receiptWallet.to)},
          { title:"Transaction Fee", value: changeKlayUnit(receiptWallet.gasUsed)+' KLAY'}   
        ]}
        nextStepButtons={[{ title: 'Next Step', onClick: this.nextStepButtonClick }]}
        stepDim={(
          <div className="stepDim" onClick={this.menuClick}></div>
        )}
        dimRender={() => (
          <div className={cx('all__loding',{'show':isAlert})}>
          <div className="left__dim"></div>
          <div className="right__dim">
            <div className="transaction__alert__popup show">
              <span className="transaction__alert__title">Your Account Is Incomplete</span>
              <p className="transaction__alert__text">
              You have NOT FINISHED creating your account. We strongly. recommend that you complete the process. Do you really want to leave this page? (You'll be redirected to the main page)
              </p>
              <div className="popup__bottom__box">
                <button className="Button Button--gray" onClick={this.moveMain}>Leave</button>
                <button className="Button" onClick={this.closeSet}>Stay</button>
              </div>
            </div>
        
          </div>
        </div>
        
        )}
        popupRender={() => (
          <div className={cx('createMainPopup type2', {
            'show' : buttonClick
          })}>
              <div className="createMainPopup__inner">
                <span  className="popup__title">Securely Store Your Wallet Key</span>
                <div className="popup__message2">
                  <p>Below is your Wallet Key. Please store it securely.<br />
                    <span className="alert_text">Klaytn cannot recover lost Wallet Key.</span></p>
                  <div className="InputCopy__inputWrapper">
                    <label className="InputCopy__label">Klaytn Wallet Key</label>
                    <textarea className="textarea__Copy" readOnly
                      ref={($input) => this.$input = $input}
                      value={HRAprivateKey}></textarea>
                  </div>
                </div> 
                <div className="popup__bottom__box">
                  <Button
                    className="popup__btn"
                    key='Copy to Clipboard & Proceed'
                    title="Copy to Clipboard & Proceed"
                    onClick={this.popupClose}
                  />
                </div>
              </div>
         </div>
        )}
      />
    )
  }
}

export default WalletHRACreationStep2
