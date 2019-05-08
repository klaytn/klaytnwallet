import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import { caver } from 'klaytn/caver'
import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import cx from 'classnames'
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
const beforeunloadEvent = (event)=>{
  event.returnValue = "페이지를 벗어나시겠습니까?";
}
class WalletCreationStep2 extends Component<Props> {

  constructor(props) {
    super(props)
   
    const { receiptWallet } = this.props
    this.state = {
      receiptWallet,
      isAlert:false,
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
  render() {
    const { receiptWallet,isAlert} = this.state
    const { handleStepMove} = this.props
 
    return (
      <WalletCreationStepPlate
        className="WalletCreationStep2"
        stepName="STEP 2"
        title="Your Custom Address Has Been Reserved"
        description={(
          <Fragment>
            Below is the custom Klaytn account address you created.<br />
            Now download your keystore file to secure your account.
          </Fragment>
        )}
        TransferTotalItem={[
            { title:"Account Name", value: caver.utils.hexToUtf8(receiptWallet.to)},
            { title:"Transaction Fee", value: (receiptWallet.gasUsed*0.001)+' ston'}   
        ]}
        nextStepButtons={[{ title: 'Next Step', onClick: pipe(this.clearReload,handleStepMove(3))}]}
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
      />
    )
  }
}

export default WalletCreationStep2
