import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onitSocket } from 'klaytn/onit'

import { krc20ABI } from 'utils/crypto'

import './MyToken.scss'

const INIT_TOKEN_LISTING_INTERVAL = 3000

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
    this.initTokenListingInterval = setInterval(this.initTokenListing, INIT_TOKEN_LISTING_INTERVAL)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tokenList.length !== this.props.tokenList.length) {
      this.initTokenListing()
    }
  }

  componentWillUnmount() {
    clearInterval(this.initTokenListingInterval)
  }

  initTokenListing = () => {
    const { tokenList } = this.props
    console.log(tokenList)
    Promise.all(
      tokenList.map(({ name, contractAddress }) => {
        const contractInstance = new onitSocket.klay.Contract(krc20ABI, contractAddress)
        contractInstance.accounts = onitSocket.klay.accounts
        return Promise.resolve(contractInstance.methods.balanceOf(this.wallet.address).call())
      }))
      .then(balances => {
        this.setState({
          isLoading: false,
          myTokenBalances: balances.map((balance, idx) => ({ fullname: tokenList[idx].fullname || tokenList[idx].name, name: tokenList[idx].name, balance }))
        })
      })
  }

  render() {
    const { isLoading, myTokenBalances } = this.state
    console.log(myTokenBalances)
    return (
      <div className="MyToken">
        {isLoading
          ? 'loading...'
          : myTokenBalances.map(({ fullname, name, balance }, idx) => (
            <TokenItem key={name} fullname={fullname} name={name} balance={balance} />
          ))
        }
      </div>
    )
  }
}

const TokenItem = ({ fullname, name, balance }) => (
  <div className="TokenItem">
    <p className="TokenItem__description">
      {fullname} 보유량: {balance} {name}
    </p>
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
