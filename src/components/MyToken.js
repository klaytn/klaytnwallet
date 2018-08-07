import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onitSocket } from 'klaytn/onit'

import { krc20ABI } from 'utils/crypto'

type Props = {

}

class MyToken extends Component<Props> {
  constructor() {
    super()
    this.wallet = onitSocket.klay.accounts.wallet[0]
  }

  state = {
    isLoading: true,
    tokenList: [],
  }

  componentDidMount() {
    this.initTokenListing()
  }

  initTokenListing = () => {
    const { tokenList } = this.props
    Promise.all(
      tokenList.map(({ name, contractAddress }) => {
        const contractInstance = new onitSocket.klay.Contract(krc20ABI, contractAddress)
        contractInstance.accounts = onitSocket.klay.accounts
        return Promise.resolve(contractInstance.methods.balanceOf(this.wallet.address).call())
      }))
      .then(balances => {
        this.setState({
          isLoading: false,
          myTokenBalances: balances.map((balance, idx) => ({ name: tokenList[idx].name, balance }))
        })
      })
  }

  render() {
    const { isLoading, myTokenBalances } = this.state
    return isLoading
      ? 'loading...'
      : myTokenBalances.map(({ name, balance }, idx) => (
        <TokenItem key={idx} name={name} balance={balance} />
      ))
  }
}

const TokenItem = ({ name, balance }) => (
  <div className="TokenItem">
    {name} token balance: {balance}
  </div>
)

const mapStateToProps = (state) => ({
  tokenList: state.token.tokenList,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyToken)
