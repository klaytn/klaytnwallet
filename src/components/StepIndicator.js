import React from 'react'
import cx from 'classnames'

type Props = {

}

import './StepIndicator.scss'

const StepIndicatorItem = ({ stepValue, currentStep }) => {
  const isChecked = currentStep > stepValue
  console.log(stepValue, currentStep)
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

const StepIndicator = ({ currentStep, className }) => (
  <div className={cx('StepIndicator', className)}>
    <StepIndicatorItem stepValue={1} currentStep={currentStep} />
    <div className="StepIndicator__border" />
    <StepIndicatorItem stepValue={2} currentStep={currentStep} />
    <div className="StepIndicator__border" />
    <StepIndicatorItem stepValue={3} currentStep={currentStep} />
  </div>
)

export default StepIndicator
