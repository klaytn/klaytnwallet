import Onit from 'onit-js'

const PING_TIME = 3000

const intervalId = setInterval(() =>
  onitSocket.klay.getBlockNumber().then(console.log), PING_TIME)

export const config = {
  rpcURL: 'http://devnet.klaytn.io:22000',
  wsURL: 'ws://devnet.klaytn.io:8546', // You can access websocket only with VPN.
}

export const onit = new Onit(new Onit.providers.HttpProvider(config.rpcURL))
export const onitSocket = new Onit(new Onit.providers.WebsocketProvider(config.wsURL))
