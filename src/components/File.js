import React, { Component } from 'react'
import classNames from 'classnames'

import Button from 'components/Button'

import './File.scss'

type Props = {

}


class File extends Component<Props> {
  propagateClick = (e) => {
    if (e.target.tagName === 'LABEL') return
    const $label = document.querySelector('.File__label')
    e.stopPropagation()
    $label.click()
  }

  componentDidMount() {
    const $file = document.querySelector('.File')
    if (!$file) return

    $file.addEventListener('click', this.propagateClick)
  }

  componentWillUnmount() {
    const $file = document.querySelector('.File')
    if (!$file) return
    $file.removeEventListener('click', this.propagateClick)
  }

  render() {
    const { icon, title, onChange, className } = this.props
    return (
      <div className={classNames('File', className)}>
        <input id="fileInput" className="File__input" type="file" onChange={onChange} />
        <Button className="File__button">
          {icon && (<img className="File__icon" src={`/images/${icon}.svg`} />)}
          <label htmlFor="fileInput" className="File__label">{title}</label>
        </Button>
      </div>
    )
  }
}

export default File
