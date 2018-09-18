import React from 'react'
import cx from 'classnames'

type Props = {

}

import './StepIndicator.scss'

const StepIndicatorItem = ({ stepValue, currentStep }) => {
  const isChecked = currentStep > stepValue
  return (
    <div className={cx('StepIndicator__item', {
      'StepIndicator__item--active': currentStep == stepValue,
      'StepIndicator__item--checked': isChecked,
    })}
    >
      {!isChecked && stepValue}
    </div>
  )
}

const StepIndicatorBorder = ({ stepValue, currentStep }) => {
  const isChecked = currentStep > stepValue
  return (
    <div
      className={cx('StepIndicator__border', {
        'StepIndicator__border--checked': isChecked,
      })}
    />
  )
}

const StepIndicator = ({ currentStep, className }) => (
  <div className={cx('StepIndicator', className)}>
    <StepIndicatorItem stepValue={1} currentStep={currentStep} />
    <StepIndicatorBorder stepValue={1} currentStep={currentStep} />
    <StepIndicatorItem stepValue={2} currentStep={currentStep} />
    <StepIndicatorBorder stepValue={2} currentStep={currentStep} />
    <StepIndicatorItem stepValue={3} currentStep={currentStep} />
  </div>
)

export default StepIndicator
