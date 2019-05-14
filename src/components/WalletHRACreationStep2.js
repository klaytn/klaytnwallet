import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
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
  event.returnValue = "페이지를 벗어나시겠습니까?";
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
  
  popupClose = () => {
    this.setState({ buttonClick: false})
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
        title="Please Save Your Klaytn HRA Private Key"
        description={(
          <Fragment>
            Your new account has been successfully created.<br />
            Please copy and securely store the Klaytn HRA Private Key below:
          </Fragment>
        )}
        render={() => (
          <InputCopy
            value={HRAprivateKey}
            className="twoLine"
            label="Klaytn HRA Private Key"
            clickEvent={this.clickEvent}
            // type="twoLine"
          />
        )}
        TransferTotalItem={[
          { title:"Account Name", value: caver.utils.hexToUtf8(receiptWallet.to)},
          { title:"Transaction Fee", value: changeKlayUnit(receiptWallet.gasUsed)+' klaytn'}   
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
              <span className="transaction__alert__title">Leave Page?</span>
              <p className="transaction__alert__text">
              You haven’t finished creating your Klaytn account yet.
              </p>
              <div className="popup__bottom__box">
                <button className="Button" onClick={this.closeSet}>Ok</button>
              </div>
            </div>
        
          </div>
        </div>
        
        )}
        popupRender={() => (
          <div className={cx('createMainPopup', {
            'show' : buttonClick
          })}>
              <div className="createMainPopup__inner widthType">
                <span  className="popup__title">Please Copy Your HRA Private Key & Securely Store It</span>
                <p className="popup__message2">Your HRA Private Key is VERY IMPORTANT in managing your account. Please COPY and STORE IT SECURELY on a safe storage. Klaytn CANNOT provide a means for recovery for lost HRA Private Keys.
                </p>
                <div className="popup__bottom__box">
                <Button
                  className="popup__btn"
                  key='OK'
                  title="OK"
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
