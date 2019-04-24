import React, { Component } from 'react'

import WalletCreationStep1 from 'components/WalletCreationStep1'
import WalletCreationStep2 from 'components/WalletCreationStep2'
import WalletCreationStep3 from 'components/WalletCreationStep3'
import WalletCreationStep4 from 'components/WalletCreationStep4'
import WalletCreationStep5 from 'components/WalletCreationStep5'
import PageAlertPopup from 'components/PageAlertPopup'
import StepIndicator from 'components/StepIndicator'
import './WalletCreation2.scss'

class WalletCreation2 extends Component<Props> {
    state = {
    currentStep: 1,
    endStep: 5, 
    StepIndicatorList: [{showStep: 1 }, {showStep: 2 }, {showStep: 3 }, {showStep: 4 }, {showStep: 5 }],
    prevRefComponentState: {},
    walletData: {},
    HRAaddress: '',
    pageType: 'HRAType',
    privateKey: '',
  }


  walletDataUpdate = (dataObj) => {
    for (var prop in dataObj) {
      switch (prop) {
        case 'walletData':
          this.setState({walletData : dataObj[prop]})
        case 'privateKey':
          this.setState({privateKey : dataObj[prop]})
        case 'HRAaddress':
          this.setState({HRAaddress : dataObj[prop]})
      }
      
    }
    
  }

  handleStepMove = (step) => () => {
    this.setState({ currentStep: step })
    if (this.prevRefComponent) {

      const { state } = this.prevRefComponent
      this.setState({ prevRefComponentState: state })
    }
  }
  returnPrivateKey = () => {
    const {privateKey, walletData} = this.state
    return privateKey+'.'+walletData.to
  }
  renderWalletCreationStep = (step) => {
    const { prevRefComponentState, pageType, walletData, privateKey, HRAaddress } = this.state
    switch (step) {
      case 1:
        return (
          <WalletCreationStep1
            ref={(step1Component) => this.prevRefComponent = step1Component}
            handleStepMove={this.handleStepMove}
            walletDataUpdate={this.walletDataUpdate}
          />
        )
      case 2:
        return (
          <WalletCreationStep2
            ref={(step2Component) => this.prevRefComponent = step2Component}
            handleStepMove={this.handleStepMove}
            receiptWallet={walletData}
          />
        )
      case 3:
      
        return (
          <WalletCreationStep3
            ref={(step3Component) => this.prevRefComponent = step3Component}
            pageType={pageType}
            privateKey={prevRefComponentState.privateKey}
            handleStepMove={this.handleStepMove}
            password={prevRefComponentState.password}
          />
        )
      case 4:
        return (
          <WalletCreationStep4
            ref={(step4Component) => this.prevRefComponent = step4Component}
            pageType={pageType}
            madePrivateKey={privateKey}
            receiptWallet={walletData}
            password={prevRefComponentState.password}
            walletDataUpdate={this.walletDataUpdate}
            handleStepMove={this.handleStepMove}
          />
        )
      case 5:
        return (
          <WalletCreationStep5
            privateKey={this.returnPrivateKey()}
            pageType={pageType}
            receiptWallet={walletData}
          />
        )
    }
  }

  render() {
    const {  StepIndicatorList, currentStep, endStep  } = this.state
    return (
      <div className="WalletCreation2">
        <PageAlertPopup className="pageAlertPopup"/>
        <div className="WalletAccess2__inner">
          <StepIndicator
            className="WalletCreation2__stepIndicator"
            StepIndicatorList={StepIndicatorList}
            currentStep={currentStep}
            endStep={endStep}
          />
          {this.renderWalletCreationStep(currentStep)}
        </div>
      </div>
    )
  }
}

export default WalletCreation2
