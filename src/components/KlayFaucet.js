import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Lottie from 'react-lottie'
import cx from 'classnames'

import { caver } from 'klaytn/caver'
import Input from 'components/Input'
import LodingButton from 'components/LodingButton'
import FaucetHowItWork from 'components/FaucetHowItWork'
import FaucetWarningModal from 'components/FaucetWarningModal'
import AlertPopup from 'components/AlertPopup'
import APIEntry from 'walletConstants/network'
import { KLAYTN_KLAY_UINT } from 'walletConstants/url'
import './KlayFaucet.scss'
const FAUCET_SUCCESS = 0
const FAUCET_FAILED = 900

type Props = {

}

class KlayFaucet extends Component<Props> {
  constructor() {
    super()
    this.wallet = {}
    
    this.state = {
      wallet:'',
      balance: '0',
      isRunning: false,
      isRunningComplete: true,
      madeDate: null,
      isLoadingFaucetableBlock: true,
      isShowingModal: false,
      popupShow: false,
      buttonName: 'OK',
      isInvalidAddress: true,
      title: 'Your KLAY Fauccet request accepted.',
      message: 'You can run faucet once every 24 hours.',
      faucetMessage: 'You can run faucet once every 24 hours (last time you ran faucet was 24 hours ago).'
    }
  }

  componentDidMount() {
  }

  getFaucetableBlock = () => {
    const root = this
    fetch(`${APIEntry}/faucet/time?address=${root.wallet.address}`, {
      method: 'GET',
    }).then(async function (response) {
        const responseText = await response.text()
        const result = JSON.parse(responseText)

        let madeDataSet, nowDataSet,remainingHour, remainingMinute, timeZone

        if(result && result.data){
          madeDataSet = new Date(result.data)
          nowDataSet = new Date()

          timeZone = nowDataSet.getTimezoneOffset()/60
          remainingHour = nowDataSet.getHours()-madeDataSet.getHours()+timeZone == 0 ? 1 : nowDataSet.getHours()-madeDataSet.getHours()+timeZone
          remainingHour = remainingHour >= 0 ? 24-remainingHour : Math.abs(remainingHour)
          remainingMinute = 60-Math.abs(nowDataSet.getMinutes()-madeDataSet.getMinutes())

          root.setState({
            isLoadingFaucetableBlock: true,
            madeDate: '',
          })
        }else{
          root.setState({
            isLoadingFaucetableBlock: false,
            isInvalidAddress:false,
            madeDate: 'Faucet is ready to run.',
          })
        }
    }).catch(function (e) {
        console.log(e);
    });
  }

  changeWallet = (e) => {
    if(e.target.value) {
      this.wallet.address = e.target.value
    }
  }

  onAddressBlur = () => {
    if(!caver.utils.isAddress(this.wallet.address)) {
      this.setState({
        isLoadingFaucetableBlock: true,
        isInvalidAddress: true,
        madeDate: 'Invalid address',
      })
      return
    }
    this.getFaucetableBlock()
    this.updateBalance()
  }

  updateBalance = () => {
    const root = this
    fetch(`${APIEntry}/faucet/balance?address=${root.wallet.address}`, {
      method: 'GET',
    }).then(async function (response) {
        const responseText = await response.text()
        const result = JSON.parse(responseText)
        root.setState({
          balance:result.data
        })    
    }).catch(function (e) {
        console.log(e);
    });
    
  }

  runFacuet = () => {
    this.setState({ isRunning: true, isRunningComplete: false })
    fetch(`${APIEntry}/faucet/run?address=${this.wallet && this.wallet.address}`, {
      method: 'POST',
    })
    .then(res => res.json())
    .then(({ status }) => {
      console.log('status', status)
      return status
    })
    .catch(err => console.log(`Error catch: ${err}`))
    .finally(() => {
      // loding end, update data 
      
      setTimeout(()=>{
        this.setState({ isRunning: false })
        this.getFaucetableBlock()
        this.updateBalance()
        this.setState({ popupShow: true })
      },3000)
    })
  }

  closeModal = () => {
    this.setState({
      isShowingModal: false,
    })
  }
  buttonClick= () => {
    this.setState({
      popupShow: false,
    })
  }
  render() {
    const {
      balance,
      isRunning,
      isRunningComplete,
      isLoadingFaucetableBlock,
      isInvalidAddress,
      isShowingModal,
      madeDate,
      popupShow,
      buttonName,
      title,
      message,
      faucetMessage,
    } = this.state

    const defaultOptions = {
      loop: true,
      autoplay: false,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      }
    }

    return (
      <div className="KlayFaucet">
        {isShowingModal && <FaucetWarningModal closeModal={this.closeModal} />}
        <AlertPopup
              popupShow={popupShow}
              buttonName={buttonName}
              buttonClick={this.buttonClick}
              title={title}
              message={message}
        />
        <div className="KlayFaucet__content">
          
          <div className="KlayFaucet__head">
            <div className="KlayFaucet__point">Only for Baobab</div>
            <header className="KlayFaucet__title">{KLAYTN_KLAY_UINT} Faucet</header>
            <p className="KlayFaucet__text">The {KLAYTN_KLAY_UINT} Faucet runs on Baobab Testnet.</p>
          </div>
          
          <Input
            onChange={this.changeWallet}
            onBlur={this.onAddressBlur}
            placeholder="Please put your wallet address here"
            label="Account Address"
            className="KlayFaucet__input KlayFaucet__address"
          />
          <Input
            value={balance}
            readOnly
            label={KLAYTN_KLAY_UINT +' Balance'}
            className="KlayFaucet__input KlayFaucet__balance"
            unit={KLAYTN_KLAY_UINT}
            madeDate={madeDate}
            isError={isLoadingFaucetableBlock}
          />
          <div className="faucet__message__box">
            <LodingButton
              title="Run Faucet"
              className="KlayFaucet__button"
              onClick={this.runFacuet}
              disabled={isLoadingFaucetableBlock || isInvalidAddress}
              loadingSet={isRunning}
            />
            {!isInvalidAddress &&
            <span className={cx('faucet__message',{'on': isLoadingFaucetableBlock})}>{isLoadingFaucetableBlock ? faucetMessage : ''}</span>
            }
          </div>
          
          <FaucetHowItWork leftBlock={madeDate} />
        </div>
        
      </div>
    )
  }
}

export default KlayFaucet
