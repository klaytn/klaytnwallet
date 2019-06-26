import Caver from 'caver-js'

const protocol = window ? window.location.protocol : 'http:';
export const config = {
  rpcURL: `${protocol}//${process.env.KLAYTN_HOST}`,
}

export const caver = new Caver(config.rpcURL);
