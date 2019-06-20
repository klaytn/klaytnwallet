import Caver from 'caver-js'

// const PING_TIME = 3000 // 3s

// const intervalId = setInterval(() =>
// caverSocket.klay.getBlockNumber().then(console.log), PING_TIME)

const protocol = window ? window.location.protocol : 'http:';
export const config = {
  rpcURL: `${protocol}//${process.env.KLAYTN_HOST}`,
  wsURL: 'ws://devnet.klaytn.io:8546', // You can access websocket only with VPN.
}

export const caver = new Caver(config.rpcURL);
// export const caverSocket = new caver(new caver.providers.WebsocketProvider(config.wsURL))
