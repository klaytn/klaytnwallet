import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import './TabItem.scss'

type Props = {
  title: string,
  link: string,
}

const TabItem = ({ title, link, isActive, icon }) => (
  <Link
    className={classNames('TabItem', {
      'TabItem--active': isActive,
    })}
    to={link}
  >
    <img
      className="TabItem__icon"
      src={`/images/${icon}${isActive ? '-on' : '-off'}.svg`}
    />
    {title}
  </Link>
)

export default TabItem
