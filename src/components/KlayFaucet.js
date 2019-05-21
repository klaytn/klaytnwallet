import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Lottie from 'react-lottie'
import cx from 'classnames'

import { caver } from 'klaytn/caver'
import Input from 'components/Input'
import LodingButton from 'components/LodingButton'
import FaucetHowItWork from 'components/FaucetHowItWork'
import FaucetWarningModal from 'components/FaucetWarningModal'
import APIEntry from 'constants/network'

import './KlayFaucet.scss'
const FAUCET_SUCCESS = 0
const FAUCET_FAILED = 900

type Props = {

}

class KlayFaucet extends Component<Props> {
  constructor() {
    super()
    this.wallet = caver.klay.accounts.wallet[0]
    
    this.state = {
      balance: '0',
      isRunning: false,
      isRunningComplete: true,
      madeDate: null,
      isLoadingFaucetableBlock: true,
      isShowingModal: false,

    }
  }

  componentDidMount() {
    if (!this.wallet) {
      browserHistory.push('/access?next=faucet')
      return
    }

    this.getFaucetableBlock()
    this.updateBalance()
  }

  getFaucetableBlock = () => {
    const root = this
    fetch(`${APIEntry}/faucet/time?address=${root.wallet.address}`, {
      method: 'GET',
    }).then(async function (response) {
        const responseText = await response.text()
        const result = JSON.parse(responseText)
        let madeDataSet, nowDataSet,remainingHour, remainingMinute
        
        if(result && result.data){
          madeDataSet = new Date(result.data)
          nowDataSet = new Date()
          remainingHour = nowDataSet.getHours()-madeDataSet.getHours() == 0 ? 1 : nowDataSet.getHours()-madeDataSet.getHours()
          remainingHour = remainingHour >= 0 ? 24-remainingHour : Math.abs(remainingHour)
          remainingMinute = 60-Math.abs(nowDataSet.getMinutes()-madeDataSet.getMinutes())

          root.setState({
            isLoadingFaucetableBlock: true,
            madeDate: `You can run faucet once every 24 hours (last time you ran faucet was ${remainingHour} hours ${remainingMinute} minutes ago).`,
          })
        }else{
          root.setState({
            isLoadingFaucetableBlock: false,
            madeDate: 'Faucet is ready to run.',
          })
        }
    }).catch(function (e) {
        console.log(e);
    });
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
      },3000)
    })
  }

  closeModal = () => {
    this.setState({
      isShowingModal: false,
    })
  }

  render() {
    const {
      balance,
      isRunning,
      isRunningComplete,
      isLoadingFaucetableBlock,
      isShowingModal,
      madeDate,
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
        <div className="KlayFaucet__content">
          
          <div className="KlayFaucet__head">
            <div className="KlayFaucet__point">Only for Baobab</div>
            <header className="KlayFaucet__title">Test_KLAY Faucet</header>
            <p className="KlayFaucet__text">The Test_KLAY Faucet runs on Baobab Network.</p>
          </div>
          
          <Input
            value={this.wallet && this.wallet.address}
            readOnly
            label="Account Address"
            className="KlayFaucet__input KlayFaucet__address"
          />
          <Input
            value={balance}
            readOnly
            label="Test_KLAY Balance"
            className="KlayFaucet__input KlayFaucet__balance"
            unit="Test_KLAY"
            madeDate={madeDate}
            isError={isLoadingFaucetableBlock}
          />
          <LodingButton
            title="Run Faucet"
            className="KlayFaucet__button"
            onClick={this.runFacuet}
            disabled={isLoadingFaucetableBlock}
            loadingSet={isRunning}
          />
          <FaucetHowItWork leftBlock={madeDate} />
        </div>
        
      </div>
    )
  }
}

export default KlayFaucet
