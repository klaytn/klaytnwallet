import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { onitSocket } from 'klaytn/onit'

import Input from 'components/Input'
import MyToken from 'components/MyToken'
import Button from 'components/Button'
import ui from 'utils/ui'
import { RegisterTokenButton } from 'components/RegisterToken'
import { download } from 'utils/misc'

import './MyWallet.scss'

const GET_BALANCE_INTERVAL = 3000

type Props = {

}

class MyWallet extends Component<Props> {
  constructor() {
    super()
    this.wallet = onitSocket.klay.accounts.wallet[0]
    this.getBalanceInterval = null
  }

  state = {
    balance: null,
    hidePrivateKey: true,
  }

  componentWillMount() {
    if (!onitSocket.klay.accounts.wallet[0]) {
      browserHistory.replace('/access')
    }
  }

  componentDidMount() {
    if (this.wallet) {
      this.getBalance()
      this.getBalanceInterval = setInterval(this.getBalance, GET_BALANCE_INTERVAL)
    }
  }

  getBalance = () => {
    onitSocket.klay.getBalance(this.wallet.address)
      .then(balance => {
        if (balance !== this.state.balance) {
          ui.showToast({ msg: '잔액이 업데이트 되었습니다.' })
          this.setState({ balance })
        }
      })
  }

  togglePrivateKey = () => {
    this.setState({ hidePrivateKey: !this.state.hidePrivateKey })
  }

  // handleDownload = () => {
  //   // const { privateKey, password } = this.props
  //   const keystore = onit.klay.accounts.encrypt(privateKey, password)
  //   this.downloadKeystore(keystore)
  // }

  // downloadKeystore = (keystore) => {
  //   const date = new Date()
  //   const fileName = `keystore-${keystore.address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
  //   download(jsonFormat(keystore), fileName)
  //   ui.showToast({ msg: '키스토어 파일이 저장되었습니다!' })
  // }

  componentWillUnmount() {
    if (this.getBalanceInterval) {
      clearInterval(this.getBalanceInterval)
    }
  }

  render() {
    const { balance, hidePrivateKey } = this.state

    return !!this.wallet && (
      <div className="MyWallet">
        <div className="MyWallet__info">
          <Input
            className="MyWallet__Input"
            title="내 주소"
            name="address"
            value={this.wallet.address}
          />
          <Input
            className="MyWallet__Input"
            name="privateKey"
            title={
              <div>개인 키&nbsp;
                <span>
                  <img
                    className="MyWallet__icon"
                    src={`/images/${hidePrivateKey ? 'hide' : 'show'}.png`}
                  />
                </span>
                &nbsp;&nbsp;
                <span style={{ color: '#AAAAAA' }}>- 아이콘 클릭을 통해 숨기고 보이게 할 수 있습니다.</span>
              </div>
            }
            onLabelClick={this.togglePrivateKey}
            labelClassName="MyWallet__hideButton"
            value={hidePrivateKey ? '************************************************' : this.wallet.privateKey}
            readOnly
            autoFocus
          />
          <Input
            name="balance"
            className="MyWallet__Input"
            title="KLAY 잔액"
            value={balance === null ? '불러오는 중...' : balance}
          />
          {/*
            <Button
              className="Mywallet__download"
              title="키스토어 파일 다운로드"
              onClick={this.handleDownload}
            />
          */}
        </div>
        <div className="MyWallet__token">
          <MyToken />
          <RegisterTokenButton />
        </div>
      </div>
    )
  }
}

export default MyWallet
