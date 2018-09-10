import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { onit } from 'klaytn/onit'

import AddToken from 'components/AddToken'
import PlusButton from 'components/PlusButton'
import { krc20ABI } from 'utils/crypto'

import './MyToken.scss'

const INIT_TOKEN_LISTING_INTERVAL = 3000

type Props = {

}

class MyToken extends Component<Props> {
  constructor() {
    super()
    this.wallet = onit.klay.accounts.wallet[0]
  }

  state = {
    isShowAddToken: false,
    isLoading: false,
    tokenList: [],
    myTokenBalances: [
      { fullname: 'KKK', name: 'KKK network', balance: 500 },
      { fullname: 'KKK', name: 'KKK network', balance: 500 },
      { fullname: 'KKK', name: 'KKK network', balance: 500 },
      { fullname: 'KKK', name: 'KKK network', balance: 500 },
      { fullname: 'KKK', name: 'KKK network', balance: 500 },
      { fullname: 'KKK', name: 'KKK network', balance: 500 },
    ]
  }

  componentDidMount() {
    // this.initTokenListing()
    // this.initTokenListingInterval = setInterval(this.initTokenListing, INIT_TOKEN_LISTING_INTERVAL)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tokenList.length !== this.props.tokenList.length) {
      // this.initTokenListing()
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
        const contractInstance = new onit.klay.Contract(krc20ABI, contractAddress)
        contractInstance.accounts = onit.klay.accounts
        return Promise.resolve(contractInstance.methods.balanceOf(this.wallet.address).call())
      }))
      .then(balances => {
        this.setState({
          isLoading: false,
          myTokenBalances: balances.map((balance, idx) => ({ fullname: tokenList[idx].fullname || tokenList[idx].name, name: tokenList[idx].name, balance }))
        })
      })
  }

  toggleAddToken = () => {
    this.setState({ isShowAddToken: !this.state.isShowAddToken })
  }

  render() {
    const { isLoading, myTokenBalances, isShowAddToken } = this.state
    const { title, className } = this.props
    console.log(myTokenBalances)
    return (
      <div className={cx('MyToken', className)}>
        <header className="MyToken__header">
          <p className="MyToken__title">{title}</p>
          <PlusButton
            className="MyToken__addTokenButton"
            onClick={this.toggleAddToken}
          />
        </header>
        <div className="MyToken__list">
          {isLoading
            ? 'loading...'
            : myTokenBalances.map(({ fullname, name, balance }, idx) => (
              <TokenItem key={name} fullname={fullname} name={name} balance={balance} />
            ))
          }
        </div>
        {isShowAddToken && <AddToken onClick={this.toggleAddToken} className="MyToken__addToken" />}
      </div>
    )
  }
}

const TokenItem = ({ fullname, name, balance }) => (
  <div className="TokenItem">
    <header className="TokenItem__title">{fullname}</header>
    <span className="TokenItem__balance">{balance}</span>
    <span className="TokenItem__tokenName">{name}</span>
    <div className="TokenItem__decoration" />
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
