import React, { Component } from 'react'

import Button from 'components/Button'

type Props = {

}

import './WalletCreationStepPlate.scss'

class WalletCreationStepPlate extends Component<Props> {
  render() {
    const {
        stepName,
        title,
        description,
        render,
        nextStepButtons = [],
      } = this.props
    return (
      <div className="WalletCreationStepPlate">
        <div className="WalletCreationStepPlate__stepName">{stepName}</div>
        <header className="WalletCreationStepPlate__title">{title}</header>
        <p className="WalletCreationStepPlate__description">
          {description}
        </p>
        {render && render()}
        <div className="WalletCreationStepPlate__nextButtons">
          {nextStepButtons.map(({ title, onClick, disabled, className }) =>
            <Button
              style={{
                width: `${nextStepButtons.length > 1 && (100 / nextStepButtons.length) - 2}%`,
              }}
              className={className}
              key={title}
              title={title}
              onClick={onClick}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    )
  }
}

export default WalletCreationStepPlate
