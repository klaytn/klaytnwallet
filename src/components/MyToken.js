import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { keyBy } from 'lodash'

import BN from 'bignumber.js'
import { caver } from 'klaytn/caver'
import AddToken from 'components/AddToken'
import PlusButton from 'components/PlusButton'
import MyTokenReminder from 'components/MyTokenReminder'
import { krc20ABI, isHRA, humanReadableChange } from 'utils/crypto'
import numeral from 'numeral'
import { KLAYTN_KLAY_UINT } from 'walletConstants/url'
import './MyToken.scss'

const INIT_TOKEN_LISTING_INTERVAL = 7000

import * as tokenActions from 'actions/token'

type Props = {

}

class MyToken extends Component<Props> {
  constructor() {
    super()
    this.wallet = caver.klay.accounts.wallet[0]
  }

  state = {
    balance: 0,
    isShowAddToken: false,
    isLoading: false,
    tokenList: [],
    myTokenBalances: [],
  }

  toggleAddToken = () => {
    const { toggleTokenAddMode } = this.props
    this.setState({ isShowAddToken: !this.state.isShowAddToken }, toggleTokenAddMode)
  }

  intervalID = null

  componentDidMount() {
    if (this.wallet) {
      this.getTokenBalances()
      this.intervalID = setInterval(this.getTokenBalances, INIT_TOKEN_LISTING_INTERVAL)
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
    const { tokenList, setMyTokenBalancesByName } = this.props
    let address = sessionStorage.getItem('address')
    if(!address) {
      address = this.wallet.address
    }
    
    if(address && isHRA(address)){
      address = humanReadableChange(address)
    }
    
    Promise.all(
      [
        caver.klay.getBalance(address),
        ...tokenList
          .filter(({ contractAddress }) => contractAddress)
          .map(({ name, contractAddress, decimal }) => {
            const contractInstance = new caver.klay.Contract(krc20ABI, contractAddress)
            contractInstance.accounts = caver.klay.accounts
            return Promise.resolve(contractInstance.methods.balanceOf(address).call())
          }),
      ])
      .then(balances => {
        const myTokenBalances = balances.map((balance, idx) => {
          const isNativeCoin = idx === 0
          if (isNativeCoin) {
            return {
              fullname: KLAYTN_KLAY_UINT,
              name: KLAYTN_KLAY_UINT,
              balance: caver.utils.fromWei(balance, 'ether'),
            }
          } else {
            const tokenMetaInfo = tokenList[idx - 1]
            return {
              fullname: tokenMetaInfo.fullname,
              name: tokenMetaInfo.name,
              balance: new BN(balance).dividedBy(10 ** tokenMetaInfo.decimal).toString(),
            }
          }
        })
        this.setState({
          isLoading: false,
          myTokenBalances: myTokenBalances,
        })
        
        // For broadcasting my token balances through redux store.
        setMyTokenBalancesByName(keyBy(myTokenBalances, ({ name }) => name))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { isLoading, myTokenBalances, isShowAddToken } = this.state
    const { title, className, selectedTokenName, selectable, addClassName } = this.props
    return (
      <div className={cx('MyToken', className)}>
        <header className="MyToken__header">
          <p className="Contents__title">{title}</p>
          <PlusButton
            className="MyToken__addTokenButton"
            onClick={this.toggleAddToken}
          />
        </header>
        <div className="Inner__Box">
          <MyTokenReminder />
          <div className={cx('MyToken__list', addClassName)}>
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
                  index={myTokenBalances.length}
                />
              ))
            }
          </div>
        
          {isShowAddToken && <AddToken onClick={this.toggleAddToken} className="MyToken__addToken" />}
        </div>
      </div>
    )
  }
}

const TokenItem = ({ fullname, name, balance = '0', tokenColor, selectedTokenName, onClick, selectable, index }) => {
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
        'TokenItem--one': index == 1,
      })}
      onClick={onClick}
    >
      <header className="TokenItem__title">{fullname}</header>
      <span className="TokenItem__balance">
        <span className="TokenItem__balanceInteger">{new BN(integerPoints).toFormat()}</span>
        {decimalPoints && <span className="TokenItem__balanceDecimal">.{decimalPoints.slice(0, 6)}</span>}
      </span>
      {/* <span className="TokenItem__tokenName">{name}</span> */}
      <div className="TokenItem__decoration" />
    </div>
  )
}

const mapStateToProps = (state) => ({
  tokenList: state.token.tokenList,
})

const mapDispatchToProps = (dispatch) => ({
  toggleTokenAddMode: () => dispatch(tokenActions.toggleTokenAddMode()),
  setMyTokenBalancesByName: (balancesByName) => dispatch(tokenActions.setMyTokenBalancesByName(balancesByName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyToken)
