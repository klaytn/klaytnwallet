import React, { Component } from 'react'
import { connect } from 'react-redux'

import { registerToken } from 'actions/token'

type Props = {

}

class RegisterToken extends Component<Props> {
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  register = () => {
    const { name, address, decimal } = this.state
    const { registerToken } = this.props
    registerToken({
      name,
      address,
      decimal,
    })
  }

  render() {
    return (
      <div className="RegisterToken">
        <input name="name" onChange={this.handleChange} />
        <input name="address" onChange={this.handleChange} />
        <input name="decimal" onChange={this.handleChange} />
        <button onClick={this.register} className="RegisterToken__register">등록</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerToken: (token) => dispatch(registerToken(token)),
})

export default connect(null, mapDispatchToProps)(RegisterToken)
