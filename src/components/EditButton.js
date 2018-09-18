import React from 'react'
import cx from 'classnames'

type Props = {

}

import './EditButton.scss'

const EditButton = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={cx('EditButton', className)}
  >
    <img className="EditButton__icon" src="/static/images/icon-setting.svg" />
    <span>Edit</span>
  </button>
)

export default EditButton
