import React, { Component } from 'react'

import './InputSearch.scss'

type Props = {

}

class InputSearch extends Component<Props> {
  render() {
    return (
      <input {...this.props} className="InputSearch" />
    )
  }
}

export default InputSearch
