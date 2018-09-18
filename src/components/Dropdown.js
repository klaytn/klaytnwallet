import React, { Component } from 'react'
import ReactDropdown from 'react-dropdown'

import './Dropdown.scss'

class Dropdown extends Component<Props> {
  state = {
    isOpen: false,
    value: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { value, options = [], onChange } = this.props
    return (
      <div className="Dropdown">
        <label className="Dropdown__label">종류: </label>
        <ReactDropdown
          options={options}
          onChange={onChange}
          placeholder="보낼 토큰 종류를 선택해주세요."
          value={value}
        />
      </div>
    )
  }
}

export default Dropdown

// <label className="WalletTransfer__label" htmlFor="type">종류: </label>
// <select name="type" onChange={this.handleChange} id="type">
//   <option selected value="KLAY">KLAY</option>
//   {tokenList.map(({ name }) => <option value={name}>{name}</option>)}
// </select>
