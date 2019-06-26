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
      'StepIndicator__item--checked': isChecked
    })}
    >
      {!isChecked && stepValue}
    </div>
  )
}

const StepIndicatorBorder = ({ stepValue, currentStep,endStep }) => {
  const isChecked = currentStep > stepValue
  const isHide = endStep === stepValue

  return (
    <div
      className={cx('StepIndicator__border', {
        'StepIndicator__border--checked': isChecked,
        'StepIndicator__border--hide': isHide
      })}
    />
  )
}
const StepIndicator = ({ StepIndicatorList, currentStep, endStep, className }) => (
  <div className={cx('StepIndicator', className)}>
    {StepIndicatorList.map(({ showStep }) => {
      return (
        <div  key={showStep} >
        <StepIndicatorItem stepValue={showStep} currentStep={currentStep} endStep={endStep} />
        <StepIndicatorBorder stepValue={showStep} currentStep={currentStep} endStep={endStep} />
        </div>
      )
    })}
  </div>
)

export default StepIndicator
