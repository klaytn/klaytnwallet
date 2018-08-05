import React from 'react'
import classNames from 'classnames'

import './Loading.scss'

type Props = {
  wholePage: boolean,
}

const Loading = ({
  wholePage,
  msg,
}: Props) => [
  <div
    key="Loading"
    className={classNames('Loading', { 'Loading--wholePage': wholePage })}
  />,
  msg && <p key="msg" className="Loading__msg">{msg}</p>,
]

export default Loading
