import React from 'react'
import classNames from 'classnames'

import Button from 'components/Button'

import './File.scss'

type Props = {

}

const File = ({ title, onChange, className }) => (
  <div className={classNames('File', className)}>
    <input id="fileInput" className="File__input" type="file" onChange={onChange} />
    <Button className="File__button">
      <label htmlFor="fileInput" className="File__label">{title}</label>
    </Button>
  </div>
)

export default File
