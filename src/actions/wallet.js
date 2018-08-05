import { INIT_WALLET_SUCCESS, INIT_WALLET_FAILED } from 'actions/actionTypes'

export const initWalletSuccess = (address, privateKey = '') => ({
  type: INIT_WALLET_SUCCESS,
  payload: { address, privateKey },
})

export const initWalletFailed = () => ({
  type: INIT_WALLET_FAILED,
})
