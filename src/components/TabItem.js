import React from 'react'
import { Link } from 'react-router'

import './TabItem.scss'

type Props = {
  title: string,
  link: string,
}

const TabItem = ({ title, link }) => (
  <Link className="TabItem" to={link}>{title}</Link>
)

export default TabItem
