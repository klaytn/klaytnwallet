import React from 'react'
import cx from 'classnames'

type Props = {

}

import './LodingButton.scss'

const EditButton = ({ onClick, className, title, loadingSet, disabled }) => (
  <button
    onClick={onClick}
    className={cx('Button LodingButton', {'Loading' : loadingSet}, className)}
    disabled={disabled}
  >
  {loadingSet && 
    <svg className='LodingBar' viewBox='0 0 14 14'>
        <circle className='LoadingInner' cx='7' cy='7' r='5' />
    </svg>
  }
    <span>{title}</span>
  </button>
)

export default EditButton
