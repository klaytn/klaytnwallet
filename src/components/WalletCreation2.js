import React, { Component } from 'react'
import cx from 'classnames'
import WalletHRACreationStep1 from 'components/WalletHRACreationStep1'
import WalletHRACreationStep2 from 'components/WalletHRACreationStep2'
import WalletHRACreationStep3 from 'components/WalletHRACreationStep3'
import WalletHRACreationStep4 from 'components/WalletHRACreationStep4'
import PageAlertPopup from 'components/PageAlertPopup'
import StepIndicator from 'components/StepIndicator'
import './WalletCreation2.scss'

class WalletCreation2 extends Component<Props> {
    state = {
    currentStep: 1,
    endStep: 4, 
    StepIndicatorList: [{showStep: 1 }, {showStep: 2 }, {showStep: 3 }, {showStep: 4 }],
    prevRefComponentState: {},
    walletData: {},
    HRAaddress: '',
    pageType: 'HRAType',
    privateKey: '',
    HRAprivateKey:'',
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
        case 'HRAprivateKey':
          this.setState({HRAprivateKey : dataObj[prop]})
            
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
    return privateKey+'0x01'+walletData.to
  }
  renderWalletCreationStep = (step) => {
    const { prevRefComponentState, pageType, walletData, privateKey, HRAaddress, HRAprivateKey } = this.state
    switch (step) {
      case 1:
        return (
          <WalletHRACreationStep1
            ref={(step1Component) => this.prevRefComponent = step1Component}
            handleStepMove={this.handleStepMove}
            walletDataUpdate={this.walletDataUpdate}
          />
        )
      case 2:
        return (
          <WalletHRACreationStep2
            ref={(step2Component) => this.prevRefComponent = step2Component}
            handleStepMove={this.handleStepMove}
            receiptWallet={walletData}
            HRAprivateKey={HRAprivateKey}
          />
        )
      case 3:
      
        return (
          <WalletHRACreationStep3
            ref={(step3Component) => this.prevRefComponent = step3Component}
            pageType={pageType}
            privateKey={privateKey}
            handleStepMove={this.handleStepMove}
            receiptWallet={walletData}
            password={prevRefComponentState.password}
            walletDataUpdate={this.walletDataUpdate}
          />
        )
      case 4:
        return (
          <WalletHRACreationStep4
            ref={(step4Component) => this.prevRefComponent = step4Component}
            pageType={pageType}
            madePrivateKey={privateKey}
            receiptWallet={walletData}
            password={prevRefComponentState.password}
            walletDataUpdate={this.walletDataUpdate}
            handleStepMove={this.handleStepMove}
          />
        )
    }
  }

  render() {
    const {  StepIndicatorList, currentStep, endStep  } = this.state
    return (
      <div className={cx('WalletCreation2','WalletCreation__step'+currentStep)}>
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
