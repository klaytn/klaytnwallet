import React from 'react'
import classNames from 'classnames'

import './Panel.scss'

type Props = {

}

const Panel = ({ children, className }) => (
  <div className={classNames('Panel', className)}>
    {children}
  </div>
)

export default Panel
