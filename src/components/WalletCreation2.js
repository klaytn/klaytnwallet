import React, { Component } from 'react'

import WalletCreationStep1 from 'components/WalletCreationStep1'
import WalletCreationStep2 from 'components/WalletCreationStep2'
import WalletCreationStep3 from 'components/WalletCreationStep3'
import StepIndicator from 'components/StepIndicator'

import './WalletCreation2.scss'

class WalletCreation2 extends Component<Props> {
  state = {
    currentStep: 1,
    prevRefComponentState: {},
  }

  handleStepMove = (step) => () => {
    this.setState({ currentStep: step })
    if (this.prevRefComponent) {
      const { state } = this.prevRefComponent
      this.setState({ prevRefComponentState: state })
    }
  }

  renderWalletCreationStep = (step) => {
    const { prevRefComponentState } = this.state
    switch (step) {
      case 1:
        return (
          <WalletCreationStep1
            ref={(step1Component) => this.prevRefComponent = step1Component}
            handleStepMove={this.handleStepMove}
          />
        )
      case 2:
        return (
          <WalletCreationStep2
            ref={(step2Component) => this.prevRefComponent = step2Component}
            handleStepMove={this.handleStepMove}
            password={prevRefComponentState.password}
          />
        )
      case 3:
        return (
          <WalletCreationStep3
            privateKey={prevRefComponentState.privateKey}
          />
        )
    }
  }

  render() {
    const { currentStep } = this.state
    return (
      <div className="WalletCreation2">
        <StepIndicator
          className="WalletCreation2__stepIndicator"
          currentStep={currentStep}
        />
        {this.renderWalletCreationStep(currentStep)}
      </div>
    )
  }
}

export default WalletCreation2
