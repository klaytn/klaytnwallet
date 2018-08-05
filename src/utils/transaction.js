import Tx from 'ethereumjs-tx'

import { onitSocket } from 'klaytn/web3'
import { contractInfo } from 'utils/contract'
import store from '../store'

const pointedContractAddress = contractInfo.mainContract.address

/**
 * @usage sendTransaction
 * sendTransaction(
      this.kittyCoreContractWebsocket.methods.giveBirth(id), // param1 'method' (web3 1.0 method)
      (err, data) => { // param2 callback
        if (err) {
          console.log(err)
          return
        }

        ui.openPopup({
          content: (
            <BirthSuccess address={this.props.address} />
          )
        })
        console.log(data)
      }
    )
 */

export const sendTransaction = (method, callback) => {
  const myAddress = store.getState().wallet.address
  const { privateKey } = store.getState().wallet

  onitSocket.klay.getTransactionCount(myAddress).then((result) => {
    const txParams = {
      nonce: `0x${(result).toString(16)}`,
      gasPrice: '0x0',
      gasLimit: '0x61a80', // TODO: dynamic gas limit
      to: pointedContractAddress,
      value: `0x${parseInt(0).toString(16)}`,
      data: method.encodeABI(),
    }

    const tx = new Tx(txParams)
    tx.sign(Buffer.from(privateKey, 'hex'))
    onitSocket.klay.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`, callback)
      .on('receipt', () => console.log)
      .on('error', (error) => {
        console.log(error)
      })
  })
    .catch((err) => {
      console.log('error', err)
    })
}
