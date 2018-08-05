const Onit = require('onit-js')

/**
 * truffle network variables
 */
const HOST = '172.31.21.128'
const PORT = '22000'
const NETWORK_ID = '2017'
const GASLIMIT = 20000000
const GASPRICE = 0

const onit = new Onit(new Onit.providers.HttpProvider(`${HOST}:${PORT}`))

// Unlock account before deploying contract. (personal.unlockAccount(...))
const FROM = onit.klay.accounts[0] || '0xdeb60a42cf3f161ef4a5697c8a97bc55a2d0a815'

/**
 * network description
 * @param {string} from - wallet address for deploying
 */
module.exports = {
  networks: {
    groundx: {
      host: HOST || '172.31.21.128',
      port: PORT || 22000,
      from: FROM,
      network_id: NETWORK_ID || '2017',
      gas: GASLIMIT || 20000000,
      gasPrice: GASPRICE || 0,
    },
  },
}
