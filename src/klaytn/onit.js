import Onit from 'onit-js'

// const PING_TIME = 3000 // 3s

// const intervalId = setInterval(() =>
// onitSocket.klay.getBlockNumber().then(console.log), PING_TIME)

const protocol = window ? window.location.protocol : 'http';
export const config = {
  rpcURL: `${protocol}//aspen.klaytn.com`,
  wsURL: 'ws://devnet.klaytn.io:8546', // You can access websocket only with VPN.
}

export const onit = new Onit(new Onit.providers.HttpProvider(config.rpcURL))
// export const onitSocket = new Onit(new Onit.providers.WebsocketProvider(config.wsURL))
