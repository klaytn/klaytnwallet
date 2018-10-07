import React from 'react'

import './ErrorMessage.scss'

type Props = {

}

const ErrorMessage = ({ msg }) => (
  <p className="ErrorMessage">{msg}</p>
)

export default ErrorMessage
