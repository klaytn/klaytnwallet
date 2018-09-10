import React from 'react'
import cx from 'classnames'

type Props = {

}

const EditButton = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={cx('EditButton', className)}
  >
    Edit
  </button>
)

export default EditButton
