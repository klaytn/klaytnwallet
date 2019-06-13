import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import cx from 'classnames'
import { caver } from 'klaytn/caver'
import InputCheck from 'components/InputCheck'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { checkValidName, decryptAction } from 'utils/crypto'
type Props = {

}

class WalletHRACreationStep1 extends Component<Props> {

  constructor() {
    super()
    this.state = {
      checkEnd: false,
      humanReadableData : '',
      HRAid: '',
      isValidName: false,
      isChecked: false,
      checkValidAlert: false,
      klayWallet: caver.klay.accounts.wallet[0],
      isHRAMade: false,
      isLoding: false,
      pageOutAction: false,
      isDuplicateName: false,
      transactionPopup: false,
      setKlaytn: '.klaytn'
    }
  }
  dataChange = (e)=>{
    this.setState({
      checkEnd: false,
      checkValidAlert:false,
      isChecked: false, 
      isHRAMade: false,
      HRAid: e.target.value,
      isValidName: e.target.value.length === 0 ? false : checkValidName(e.target.value),
    })
  }
  setTransaction = async (e) => {
    const { transactionPopup } = this.state
    const { HRAid, isChecked, setKlaytn, isHRAMade } = this.state
    await caver.klay.accountCreated(HRAid+setKlaytn).then((data) => {
      this.setState({ isHRAMade: data, checkValidAlert: !data })
    })
    
    if(!this.state.isHRAMade){
      this.setState({ isChecked: true, checkEnd: true, checkValidAlert: false }) 
      this.setState({ transactionPopup: true })
      
    }else{
      this.setState({ checkValidAlert: true })
    }
  }
  resetAccount = () => {
    this.setState({ HRAid: '', isDuplicateName: false, isLoding: false, checkValidAlert: false, isValidName: false })
    document.getElementsByClassName('KlayText')[0].style.left = '65px'
  }
  
  closePopup = () => {
    this.setState({ transactionPopup: false })
  }
  HRACreate = (e) => {
    const { handleStepMove, walletDataUpdate } = this.props
    const { klayWallet, HRAid, setKlaytn, isLoding, isDuplicateName } = this.state
    const humanReadableAddress = HRAid + '.klaytn'
    const address = sessionStorage.getItem('address') ? sessionStorage.getItem('address') : klayWallet.address
    const setHandleStepMove = handleStepMove(2)
    this.setState({ isLoding: true, transactionPopup: false })
    const newWallet = caver.klay.accounts.create()
    
    caver.klay.accounts.wallet.add(newWallet.privateKey, caver.utils.humanReadableStringToHexAddress(humanReadableAddress))
    const newPublicKey = caver.klay.accounts.privateKeyToPublicKey(newWallet.privateKey)
    const sender_transaction = {
      type: 'ACCOUNT_CREATION',
      from: klayWallet.address,
      to: humanReadableAddress,
      publicKey: newPublicKey,
      gas: '4040000000',
      value: 0,
    }

    // send id
    caver.klay.sendTransaction(sender_transaction)
      .on('transactionHash', console.log)
      .on('receipt', async (receipt) => {
        walletDataUpdate({
          walletData: receipt,
          privateKey: String(newWallet.privateKey),
          HRAprivateKey: newWallet.privateKey+'0x01'+ caver.utils.humanReadableStringToHexAddress(humanReadableAddress)
        })
        setHandleStepMove();
        this.setState({ isLoding: false })
      })
      .on('error', (error) => {
        console.log(error)
        this.setState({ isDuplicateName: true })
      })
  }
  
  render() {
    const { handleStepMove, dataChange } = this.props
    const { checkEnd, HRAid, isChecked, isLoding, checkValidAlert, isValidName, isDuplicateName, transactionPopup } = this.state
    return (
      <WalletCreationStepPlate
        stepName="STEP 1"
        title={(
          <Fragment>
            Create Your Own Account Address
          </Fragment>
        )}
        description={(
          <Fragment>
            Klaytn lets you customize your new account’s address, so here’s a chance to be creative.
            Please note that you can only use alphanumerics for your customized addresses (no special characters allowed, case sensitive).
            Your input string should be 5~13 characters long, and will be automatically appended with “.klaytn”.
          </Fragment>
        )}
        render={() => (
          <div className="HRAMadeBox">
          <InputCheck
            name="Account Address"
            placeholder="yourname"
            label="Account Address"
            value={HRAid}
            onChange={this.dataChange}
            buttonText="Check"
            isChecked={isChecked}
            buttonDisabled= {!isValidName || checkValidAlert }
            autocomplete={'off'}
            err={checkValidAlert}
          />
          {checkValidAlert && (
            <p className="Input__error">The account name is already taken, please choose another one</p>
          )}
          
          </div>
        )}
        dimRender={() => (
          <div className={cx('all__loding',{'show':isLoding || isDuplicateName || transactionPopup})}>
            <div className="left__dim"></div>
            <div className="right__dim">
              <div className={cx('transaction__alert__popup',{'show':isLoding})}>
                <span className="transaction__alert__title">Sending transaction to create your custom account</span>
                <p className="transaction__alert__text">
                  Please wait while we collect the transaction results.
                </p>
                <div className="popup__bottom__box">
                  <svg className="page__load" id="loading" x="0px" y="0px" viewBox="0 0 44 44">
                    <circle className="page__loading__inner" id="loading-circle" cx="22" cy="22" r="18"/>
                  </svg>
                  <span className="wait__text">Please wait…</span>
                </div>
              </div>
              <div className={cx('transaction__alert__popup disNone',{'show': isDuplicateName})}>
                <span className="transaction__alert__title">Uh-oh, this address is already taken</span>
                <p className="transaction__alert__text">
                  We are sorry, the address you requested for has just been taken by someone else. Please try a different address.
                </p>
                <div className="popup__bottom__box">
                  <button className="Button" onClick={this.resetAccount}>Go Back</button>
                </div>
              </div>
              <div className={cx('transaction__alert__popup type1 disNone',{'show': transactionPopup})}>
                <p className="transaction__alert__title"><span className="alert_icon">👏</span>You Are About to <span className="alert_text">Spend 100 KLAY + tx fee</span></p>
                <p className="transaction__alert__text">
                  By selecting ‘Proceed’, you will send an account creation transaction to Klaytn network.
                </p>
                <div className="popup__bottom__box">
                  <button className="Button Button--gray" onClick={this.closePopup}>Cancel</button>
                  <button className="Button" onClick={this.HRACreate}>Proceed</button>
                </div>
              </div>                  
            </div>
          </div>
        )}
        nextStepButtons={[{ title: 'Next Step', onClick: this.setTransaction, disabled: !isValidName }]}
      />
    )
  }
}

export default WalletHRACreationStep1

