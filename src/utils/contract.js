import KittyCoreJSON from 'contracts/KittyCore.json'
import { onit, onitSocket } from 'klaytn/onit'

export const contractInfo = {
  KittyCore: {
    name: 'KittyCore',
    address: DEPLOYED_ADDRESS,
    abi: KittyCoreJSON.abi,
  }
}

contractInfo.mainContract = contractInfo.KittyCore

export const getContract = (contractName, provider = 'rpc') => {
  let contractInstance
  const { abi, address } = contractInfo[contractName]
  if (provider === 'rpc') {
    contractInstance = new onit.klay.Contract(abi, address)
  } else {
    contractInstance = new onitSocket.klay.Contract(abi, address)
    contractInstance.accounts = onitSocket.accounts
  }
  return contractInstance
}

export default contractInfo
