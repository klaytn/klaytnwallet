import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import cx from 'classnames'
import { onit } from 'klaytn/onit'
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
      isValidName: null,
      isChecked: false,
      checkValidAlert: false,
      klayWallet: onit.klay.accounts.wallet[0],
      isHRAMade: false,
      isLoding: false,
      pageOutAction: false,
    }
  }
  dataChange = (e)=>{
    this.setState({ checkEnd: false })
    this.setState({ HRAid: e.target.value })
    
    // 데이터 체크
    this.setState({
      HRAid: e.target.value,
      isValidName: e.target.value.length === 0 ? null : checkValidName(e.target.value),
    })
  }

  HRACheck = async (e) => {
    const { HRAid, isChecked, isHRAMade } = this.state

    try {
      let isHRAMadeSet = await onit.klay.accountCreated(HRAid)
      this.setState({ isHRAMade: isHRAMadeSet })
    } catch (e) {

    }
    if(!isHRAMade){
      this.setState({ isChecked: true })
      this.setState({ checkEnd: true })
      setTimeout(()=>{        
        this.setState({ isChecked: false })
      },2000)    
    }
    
  }

  HRACreate = (e) => {
    const { handleStepMove, walletDataUpdate } = this.props
    const { klayWallet, HRAid, isLoding } = this.state
    let setHandleStepMove = handleStepMove(2)
    this.setState({ isLoding: true })
    //기본 보낼 객체 생성
    const sender_transaction = {
      type: 'ACCOUNT_CREATION',//타입 계정 생성
      from: klayWallet.address, // 보내는 주소 
      to: HRAid, //humanReadable 생성할 이름 
      humanReadable: true,// humanReadable로 생성할지 여부
      publicKey: onit.klay.accounts.privateKeyToPublicKey(klayWallet.privateKey), //퍼블릭키
      gas: '300000', // 가스양 ( 계정 생성시에 드는 비용 )
      value: 1,// value 가 없으면 계정 생성이 실패함
    }
    this.setState({ privateKey: klayWallet.privateKey })
    
    console.log(sender_transaction)
    //메모리 상에 월렛 privateKey를 등록함으로서 sendTransaction시에 확인이 가능하도록 한다.
    onit.klay.accounts.wallet.add(klayWallet.privateKey) 

    // 아이디 전송 작업 진행
    onit.klay.sendTransaction(sender_transaction)
      .on('transactionHash', console.log)
      .on('receipt', async (receipt) => {
        
        const toshiAccountBalance = await onit.klay.getBalance('sparrow22')
        console.log(toshiAccountBalance)
        console.log('caver.klay.getBalance("sparrow"): ' +onit.utils.fromPeb(toshiAccountBalance, 'KLAY') +' KLAY')
        //페이지 이동
        walletDataUpdate({
          walletData: receipt,
          privateKey: klayWallet.privateKey
        })
        setHandleStepMove();
        this.setState({ isLoding: false })
      })
      .on('error', (error) => {
        console.log(error)
        //기존 페이지 유지 및 alert 팝업 호출 및 input value 삭제
        
      })
  }
  
  render() {
    const { handleStepMove, dataChange } = this.props
    const { checkEnd, HRAid, isChecked, HRACheck, isLoding, checkValidAlert, isValidName, HRACreate, inputWidth,pageOutAction } = this.state
 
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
            The maximum length of your address is 15 characters.
          </Fragment>
        )}
        render={() => (
          <div className="HRAMadeBox">
          <InputCheck
            name="Account Name"
            placeholder="Enter the Account Name"
            label="Account Name"
            value={HRAid}
            onClick={this.HRACheck}
            onChange={this.dataChange}
            buttonText="Check"
            isChecked={isChecked}
            buttonDisabled= {!isValidName}
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
          <div className={cx('all__loding',{'show':isLoding || pageOutAction})}>
            <div className="left__dim"></div>
            <div className="right__dim">

              <div className={cx('transaction__alert__popup',{'show':isLoding && pageOutAction})}>
                <span className="transaction__alert__title">Sending Transaction</span>
                <p className="transaction__alert__text">
                Please wait while the document is being prepared for reading.
                </p>
                <div className="popup__bottom__box">
                  <svg className="page__load" id="loading" x="0px" y="0px" viewBox="0 0 44 44">
                    <circle className="page__loading__inner" id="loading-circle" cx="22" cy="22" r="18"/>
                  </svg>
                  <span className="wait__text">Please wait…</span>
                </div>
              </div>
              <div className={cx('transaction__alert__popup disNone',{'show': !isLoding && pageOutAction})}>
                <span className="transaction__alert__title">Leave Page?</span>
                <p className="transaction__alert__text">
                You haven’t finished creating your Klaytn account yet. <br />Do you want to leave without finishing? 
                </p>
                <div className="popup__bottom__box">
                  <button className="Button">Leave</button>
                  <button className="Button">Stay</button>
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

