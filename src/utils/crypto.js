import randombytes from 'randombytes'
import { caver } from 'klaytn/caver'
import BN from 'bignumber.js'
const CRYPO_PASSWORD = process && process.env.CRYPO_PASSWORD

const CryptoJS = require('crypto-js')
const MINIMUM_PASSWORD_LENGTH = 8
const MINIMUM_NAME_LENGTH = 5
const MAXIMUM_NAME_LENGTH = 13
const MAXIMUM_PASSWORD_LENGTH = 128
export const HRAMADEVALUE = 100001025000000000000
export const encryptAction = (myKey) => {
  return CryptoJS.AES.encrypt(myKey, CRYPO_PASSWORD).toString()
}

export const decryptAction = (myKey) => {
  if(myKey){
    return CryptoJS.AES.decrypt(myKey, CRYPO_PASSWORD).toString(CryptoJS.enc.Utf8);
  }
  return null
}

export const getRandomBytes = () => randombytes(32)
  .reduce((acc, cur) => {
    return acc += (cur.toString(16).length == 2)
      ? cur.toString(16)
      : '0' + cur.toString(16)
    }, '')

export const isValidPrivateKey = (privateKey) => {
  let privateKeyCandidate = privateKey
  if (privateKey.slice(0, 2) === '0x') {
    privateKeyCandidate = privateKey.slice(2)
  }

  return String(privateKeyCandidate)
    .split('')
    .filter(character => /^[a-f0-9A-F]$/i.test(character))
    .length === 64
}
export const isValidWalletKey = (walletKey) => {
  const addressCheck = walletKey.slice(66, 70)
  if (walletKey.length === 112 && addressCheck == '0x00') {
    const privateKey = walletKey.slice(0, 66)
    const address = walletKey.slice(70, 112)
    return isValidPrivateKey(privateKey) && caver.utils.isAddress(address)
  }
}
export const has8MoreCharacters = (password) => password.length >= MINIMUM_PASSWORD_LENGTH && password.length <= MAXIMUM_PASSWORD_LENGTH
export const has5and13Characters = (name) => (name.length >= MINIMUM_NAME_LENGTH && name.length <= MAXIMUM_NAME_LENGTH)

export const hasSpecialCharacters = (password) => (/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/.test(password))
export const hasNoSpecialCharacters = (name) => (/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/.test(name) !== true )
export const onlyAlphabetAndNumbers = (name) => (/^[A-Za-z0-9+]*$/i.test(name) && name )

export const hasNoFirstNumber = (name) => (/^[A-za-z]/g.test(name))
export const onlyAlphabet12Max = (name) => (/^[A-Za-z]*$/i.test(name) && name.length > 0 && name.length <= 12)
export const hasAtLeastOneNumber = (password) => (/[0-9]/.test(password))
export const isHRA = (value: string) => RegExp(/^[A-Za-z][0-9A-Za-z]{4,12}\.klaytn$/).test(value)
export const checkValidPassword = (password) => {
  return has8MoreCharacters(password)
    && hasSpecialCharacters(password)
    && hasAtLeastOneNumber(password)
}
export const checkValidName = (name) => {
  return has5and13Characters(name)
    && onlyAlphabetAndNumbers(name)
    && hasNoFirstNumber(name)
    && hasNoSpecialCharacters(name)
    
    
}

export const klayKeyMade = (privateKey, address) => {
  return privateKey+'0x01'+address
}

export const klayKeyDecomulation = (klayKey) => {
  let klayKeyObj, returnObj
  if(klayKey.indexOf('0x01') > 0){
    klayKeyObj= klayKey.split('0x01')
    returnObj = {
      privateKey : Number(klayKeyObj[0]),
      address : Number(klayKeyObj[1]),
    }
  }else{
    returnObj = {
      privateKey : Number(klayKey),
    }
  }

  return returnObj
}
export const changeKlayUnit = (data) => {
  return BN(data*25).multipliedBy(0.000000001).toFixed()
}
export const klaytnKeyCheck = (data) => {
  if(isValidWalletKey(data)){
    //return data.match(/0x00|0x01/)[0]
    return data.match(/0x00/)[0]
  }else{
    return false
  }
}
export const humanReadableChange = (address) => {
  return isHRA(address) ? caver.utils.humanReadableStringToHexAddress(address) : address
}

export const krc20ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
]
