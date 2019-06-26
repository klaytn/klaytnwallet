import {
  REGISTER_TOKEN,
  TOGGLE_TOKEN_ADD_MODE,
  SET_MY_TOKEN_BALANCES_BY_NAME,
  RESET_TOKEN,
} from 'actions/actionTypes'

import { getParsedSessionStorageItem } from 'utils/misc'
import tokenMetaList from 'utils/tokenMetaList'

const initialState = {
  tokenList: [...tokenMetaList, ...getParsedSessionStorageItem('savedTokenList')],
  isTokenAddMode: false,
}

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_TOKEN:
      return {
        ...state,
        tokenList: [...state.tokenList, action.payload.token],
      }
    case TOGGLE_TOKEN_ADD_MODE:
      return {
        ...state,
        isTokenAddMode: !state.isTokenAddMode,
      }
    case SET_MY_TOKEN_BALANCES_BY_NAME:
      return {
        ...state,
        balancesByName: action.payload.balancesByName,
      }
    case RESET_TOKEN:
      return {
        ...state,
        tokenList: [],
      }  
    default:
      return state
  }
}

export default tokenReducer
