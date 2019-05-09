import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import cx from 'classnames'
import { caver } from 'klaytn/caver'
import InputCheck from 'components/InputCheck'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { checkValidName } from 'utils/crypto'
type Props = {

}

class WalletCreationStep1 extends Component<Props> {

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
      setKlaytn: '.klaytn'
    }
  }
  dataChange = (e)=>{
    this.setState({
      checkEnd: false,
      checkValidAlert:false,
      HRAid: e.target.value,
      isValidName: e.target.value.length === 0 ? false : checkValidName(e.target.value),
    })
  }

  HRACheck = async (e) => {
    const { HRAid, isChecked, setKlaytn, isHRAMade } = this.state

    try {
      let isHRAMadeSet = await caver.klay.accountCreated(HRAid+setKlaytn)
      await this.setState({ isHRAMade: isHRAMadeSet })
    } catch (e) {

    }
    
    if(!this.state.isHRAMade){
      this.setState({ isChecked: true })
      this.setState({ checkEnd: true })
      setTimeout(()=>{        
        this.setState({ isChecked: false, isHRAMade: false})
      },2000)    
    }else{
      this.setState({ checkValidAlert: true })
    }
  }
  resetAccount = () => {
    this.setState({ HRAid: '', isDuplicateName: false, isLoding: false, isValidName: false })
    document.getElementsByClassName('KlayText')[0].style.left = '65px'
  }
  HRACreate = (e) => {
    const { handleStepMove, walletDataUpdate } = this.props
    const { klayWallet, HRAid, setKlaytn, isLoding, isDuplicateName } = this.state
    const address = sessionStorage.getItem('address') ? sessionStorage.getItem('address') : klayWallet.address
    let setHandleStepMove = handleStepMove(2)
    this.setState({ isLoding: true })
    
    caver.klay.accounts.wallet.add(klayWallet.privateKey)
  
    const humanReadableAddress = HRAid + '.klaytn'
  
    const { privateKey: newPrivateKey } = caver.klay.accounts.create()
    const newPublicKey = caver.klay.accounts.privateKeyToPublicKey(newPrivateKey)
  
    const sender_transaction = {
      type: 'ACCOUNT_CREATION',
      from: address,
      to: humanReadableAddress,
      gas: '5000000000',

      publicKey: newPublicKey,
      value: caver.utils.toPeb('0.01', 'KLAY'),
    }

    this.setState({ privateKey: klayWallet.privateKey })

    // send id
    caver.klay.sendTransaction(sender_transaction)
      .on('transactionHash', console.log)
      .on('receipt', async (receipt) => {

        walletDataUpdate({
          walletData: receipt,
          privateKey: klayWallet.privateKey
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
    const { checkEnd, HRAid, isChecked, isLoding, checkValidAlert, isValidName, isDuplicateName } = this.state
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
            Klaytn lets you customize your own account address, so here’s a chance to be creative.
            Please note that you can only use alphabet and numbers, no special characters allowed.
            Your address length should be 5~13 characters.
          </Fragment>
        )}
        render={() => (
          <div className="HRAMadeBox">
          <InputCheck
            name="Account Name"
            placeholder="yourname"
            label="Account Name"
            value={HRAid}
            onClick={this.HRACheck}
            onChange={this.dataChange}
            buttonText="Check"
            isChecked={isChecked}
            buttonDisabled= {!isValidName}
            autocomplete={'off'}
          />
          
          {isChecked && (
            <p className="Input__error Input__error--end">Available</p>
          )}
          {checkValidAlert && (
            <p className="Input__error">The account name is already taken, please choose another one</p>
          )}
          
          </div>
        )}
        dimRender={() => (
          <div className={cx('all__loding',{'show':isLoding || isDuplicateName})}>
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
            </div>
          </div>
        )}
        nextStepButtons={[{ title: 'Next Step', onClick: this.HRACreate, disabled : !checkEnd }]}
      />
    )
  }
}

export default WalletCreationStep1

