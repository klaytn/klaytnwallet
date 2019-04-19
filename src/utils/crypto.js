import randombytes from 'randombytes'

const MINIMUM_PASSWORD_LENGTH = 8
const MINIMUM_NAME_LENGTH = 5
const MAXIMUM_NAME_LENGTH = 13
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

export const has8MoreCharacters = (password) => password.length >= MINIMUM_PASSWORD_LENGTH
export const has5and13Characters = (name) => (name.length >= MINIMUM_NAME_LENGTH && name.length <= MAXIMUM_NAME_LENGTH)

export const hasSpecialCharacters = (password) => (/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/.test(password))
export const hasNoSpecialCharacters = (name) => (/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/.test(name) !== true )
export const onlyAlphabetAndNumbers = (name) => (/^[A-Za-z0-9+]*$/i.test(name))

export const hasNoFirstNumber = (name) => (/^[A-za-z]/g.test(name))

export const hasAtLeastOneNumber = (password) => (/[0-9]/.test(password))

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
  return privateKey+'.'+address
}

export const klayKeyDecomulation = (klayKey) => {
  let klayKeyObj, returnObj
  if(klayKey.indexOf('.') > 0){
    klayKeyObj= klayKey.split('.')
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
