import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { keyBy } from 'lodash'

import { onit } from 'klaytn/onit'
import AddToken from 'components/AddToken'
import PlusButton from 'components/PlusButton'
import { krc20ABI } from 'utils/crypto'
import numeral from 'numeral'

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
    balance: 0,
    isShowAddToken: false,
    isLoading: false,
    tokenList: [],
    myTokenBalances: [],
  }

  toggleAddToken = () => {
    this.setState({ isShowAddToken: !this.state.isShowAddToken })
  }

  intervalID = null

  componentDidMount() {
    if (this.wallet) {
      this.getTokenBalances()
      this.intervalID = setInterval(this.getTokenBalances, 5000)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tokenList.length !== this.props.tokenList.length) {
      this.getTokenBalances()
    }
  }

  componentWillUnmount() {
    if (this.intervalID) clearInterval(this.intervalID)
  }

  selectToken = ({ name: tokenSymbol, tokenColorIdx }) => () => {
    const { selectable, handleSelect } = this.props
    if (!selectable) return
    handleSelect({ tokenSymbol, tokenColorIdx })
  }

  getTokenBalances = () => {
    const { tokenList } = this.props
    Promise.all(
      [
        onit.klay.getBalance(this.wallet.address),
        ...tokenList
          .filter(({ contractAddress }) => contractAddress)
          .map(({ name, contractAddress }) => {
            const contractInstance = new onit.klay.Contract(krc20ABI, contractAddress)
            contractInstance.accounts = onit.klay.accounts
            return Promise.resolve(contractInstance.methods.balanceOf(this.wallet.address).call())
          }),
      ])
      .then(balances => {
        const myTokenBalances = balances.map((balance, idx) => {
          const isNativeCoin = idx === 0
          if (isNativeCoin) {
            return {
              fullname: 'KLAY',
              name: 'KLAY',
              balance: onit.utils.fromWei(balance, 'ether'),
            }
          } else {
            return {
              fullname: tokenList[idx - 1].fullname,
              name: tokenList[idx - 1].name,
              balance,
            }
          }
        })
        this.setState({
          isLoading: false,
          myTokenBalances: myTokenBalances,
          tokenBalanceByName: keyBy(myTokenBalances, ({ value }) => value),
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { isLoading, myTokenBalances, isShowAddToken } = this.state
    const { title, className, selectedTokenName, selectable } = this.props
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
              <TokenItem
                selectable={selectable}
                key={name}
                fullname={fullname}
                name={name}
                balance={balance}
                tokenColor={(idx % 4) + 1}
                selectedTokenName={selectedTokenName}
                onClick={this.selectToken({ name, tokenColorIdx: (idx % 4) + 1})}
              />
            ))
          }
        </div>
        {isShowAddToken && <AddToken onClick={this.toggleAddToken} className="MyToken__addToken" />}
      </div>
    )
  }
}

const TokenItem = ({ fullname, name, balance = '0', tokenColor, selectedTokenName, onClick, selectable }) => {
  const [ integerPoints, decimalPoints ] = balance.split('.')
  return (
    <div
      className={cx('TokenItem', {
        'TokenItem--readOnly': !selectable,
        'TokenItem--active': selectedTokenName == name,
        'TokenItem--token-color-1': tokenColor == 1,
        'TokenItem--token-color-2': tokenColor == 2,
        'TokenItem--token-color-3': tokenColor == 3,
        'TokenItem--token-color-4': tokenColor == 4,
      })}
      onClick={onClick}
    >
      <header className="TokenItem__title">{fullname}</header>
      <span className="TokenItem__balance">
        <span className="TokenItem__balanceInteger">{numeral(integerPoints).format('0,0')}</span>
        {decimalPoints && <span className="TokenItem__balanceDecimal">.{decimalPoints.slice(0, 6)}</span>}
      </span>
      <span className="TokenItem__tokenName">{name}</span>
      <div className="TokenItem__decoration" />
      <div className="TokenItem__arrow" />
    </div>
  )
}

const mapStateToProps = (state) => ({
  tokenList: state.token.tokenList,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyToken)
