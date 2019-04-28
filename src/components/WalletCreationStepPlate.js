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
        dimRender,
        accountRender,
        nextStepButtons = [],
        TransferTotalItem=[],
        className,
      } = this.props
    return (
      <div className={cx('WalletCreationStepPlate', className)}>
        <div className="WalletCreationStepPlate__stepName">{stepName}</div>
        <div className="WalletCreationStepPlate__title">{title}</div>
        <p className="WalletCreationStepPlate__description">
          {description}
        </p>
        {render && render()}
        {reminder && reminder()}
        {accountRender && accountRender()}
        <div className="WalletCreationStepPlate__list">
          {TransferTotalItem.map(({
              title,
              value
            }) =>
            <div className="TransferTotal__item" key={title}>
              <span className="TransferTotal__itemTitle">{title}</span>
              <span className="TransferTotal__itemValue">{value}</span>
            </div>
            )}
        </div>
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
        {dimRender && dimRender()}
      </div>
    )
  }
}

export default WalletCreationStepPlate
