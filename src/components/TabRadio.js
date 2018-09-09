import React, { Component } from 'react'
import cx from 'classnames'

import './TabRadio.scss'

const TabRadioItem = ({
  title,
  value,
  onClick,
  active,
}) => (
  <div
    className={cx('TabRadio__item', {
      'TabRadio__item--active': active,
    })}
    onClick={onClick}
  >
    {title}
  </div>
)

class TabRadio extends Component<Props> {
  render() {
    const { className, tabs, selectedValue, onClick } = this.props
    return (
      <div className={cx('TabRadio', className)}>
        {tabs.map(({ title, value }) => (
          <TabRadioItem
            title={title}
            value={value}
            onClick={onClick(value)}
            active={selectedValue == value}
          />
        ))}
      </div>
    )
  }
}

export default TabRadio
