import React, { Component } from 'react'

import WalletCreationStep3 from 'components/WalletCreationStep3'
import WalletCreationStep4 from 'components/WalletCreationStep4'
import WalletCreationStep5 from 'components/WalletCreationStep5'
import StepIndicator from 'components/StepIndicator'

import './WalletCreation1.scss'

class WalletCreation1 extends Component<Props> {
  state = {
    currentStep: 3,
    endStep: 3, 
    prevRefComponentState: {},
    StepIndicatorList: [
      {showStep:1 },
      {showStep:2 },
      {showStep:3 }
    ],
    pageType: 'normal'
  }

  handleStepMove = (step) => () => {
    this.setState({ currentStep: step })
    this.setState({ showStep: step - 2 })
    
    if (this.prevRefComponent) {
      const { state } = this.prevRefComponent
      this.setState({ prevRefComponentState: state })
    }
  }

  renderWalletCreationStep = (step) => {
    const { prevRefComponentState,pageType } = this.state
    console.log('prevRefComponentState : '+ prevRefComponentState)

    switch (step) {
      case 3:
        return (
          <WalletCreationStep3
            ref={(step3Component) => this.prevRefComponent = step3Component}
            privateKey={prevRefComponentState.privateKey}
            handleStepMove={this.handleStepMove}
            password={prevRefComponentState.password}
          />
        )
      case 4:     
        return (
          <WalletCreationStep4
            ref={(step4Component) => this.prevRefComponent = step4Component}
            privateKey={prevRefComponentState.privateKey}
            password={prevRefComponentState.password}
            handleStepMove={this.handleStepMove}

          />
        )
      case 5:
        return (
          <WalletCreationStep5
            privateKey={prevRefComponentState.privateKey}
            pageType={pageType}
          />
        )
    }
  }

  render() {
    const { StepIndicatorList, currentStep, endStep } = this.state
    return (
      <div className="WalletCreation2">
        <div className="WalletAccess2__inner">
          <StepIndicator
            className="WalletCreation2__stepIndicator"
            StepIndicatorList={StepIndicatorList}
            currentStep={currentStep-2}
            endStep={endStep}
          />
          {this.renderWalletCreationStep(currentStep)}
        </div>
      </div>
    )
  }
}

export default WalletCreation1
