import React, { Component } from 'react'

import WalletCreationStep1 from 'components/WalletCreationStep1'
import WalletCreationStep2 from 'components/WalletCreationStep2'
import WalletCreationStep3 from 'components/WalletCreationStep3'
import StepIndicator from 'components/StepIndicator'

import './WalletCreation1.scss'

class WalletCreation1 extends Component<Props> {
  state = {
    currentStep: 1,
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
    this.setState({ showStep: step})
    
    if (this.prevRefComponent) {
      const { state } = this.prevRefComponent
      this.setState({ prevRefComponentState: state })
    }
  }

  renderWalletCreationStep = (step) => {
    const { prevRefComponentState,pageType } = this.state
    console.log('prevRefComponentState : '+ prevRefComponentState)

    switch (step) {
      case 1:
        return (
          <WalletCreationStep1
            ref={(step3Component) => this.prevRefComponent = step3Component}
            privateKey={prevRefComponentState.privateKey}
            handleStepMove={this.handleStepMove}
            password={prevRefComponentState.password}
            pageType={pageType}
          />
        )
      case 2:     
        return (
          <WalletCreationStep2
            ref={(step4Component) => this.prevRefComponent = step4Component}
            privateKey={prevRefComponentState.privateKey}
            password={prevRefComponentState.password}
            handleStepMove={this.handleStepMove}
            pageType={pageType}

          />
        )
      case 3:
        return (
          <WalletCreationStep3
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
            currentStep={currentStep}
            endStep={endStep}
          />
          {this.renderWalletCreationStep(currentStep)}
        </div>
      </div>
    )
  }
}

export default WalletCreation1
