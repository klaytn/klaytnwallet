import React, { Component } from 'react'
import cx from 'classnames'

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
        reminder,
        nextStepButtons = [],
        className,
      } = this.props
    return (
      <div className={cx('WalletCreationStepPlate', className)}>
        <div className="WalletCreationStepPlate__stepName">{stepName}</div>
        <header className="WalletCreationStepPlate__title">{title}</header>
        <p className="WalletCreationStepPlate__description">
          {description}
        </p>
        {render && render()}
        {reminder && reminder()}
        <div className="WalletCreationStepPlate__nextButtons">
          {nextStepButtons.map(({
              title,
              onClick,
              disabled,
              gray,
              red,
              className,
            }) =>
            <Button
              style={{
                width: `${nextStepButtons.length > 1 && (100 / nextStepButtons.length) - 2}%`,
              }}
              className={className}
              gray={gray}
              red={red}
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
