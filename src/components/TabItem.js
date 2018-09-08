import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import './TabItem.scss'

type Props = {
  title: string,
  link: string,
}

const TabItem = ({ title, link, isActive }) => (
  <Link className={classNames('TabItem', {
    'TabItem--active': isActive,
  })} to={link}>{title}</Link>
)

export default TabItem
