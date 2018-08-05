import {
  INIT_WALLET_SUCCESS,
  INIT_WALLET_FAILED,
} from 'actions/actionTypes'

import { toLowerCase } from 'utils/misc'

const initialState = {
  address: '',
  isLocked: false,
}

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_WALLET_SUCCESS:
      return {
        ...state,
        address: toLowerCase(action.payload.address, 2),
        // TODO: don't store private key instantly. (need encryption)
        privateKey: action.payload.privateKey,
      }
    case INIT_WALLET_FAILED:
      return {
        ...state,
        address: '',
        isLocked: true,
      }
    default:
      return state
  }
}

export default walletReducer
