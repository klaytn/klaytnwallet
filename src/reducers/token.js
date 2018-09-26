import {
  REGISTER_TOKEN,
  TOGGLE_TOKEN_ADD_MODE,
} from 'actions/actionTypes'

import { getParsedLocalStorageItem } from 'utils/misc'
import tokenMetaList from 'utils/tokenMetaList'

const initialState = {
  tokenList: [...tokenMetaList, ...getParsedLocalStorageItem('savedTokenList')],
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
    default:
      return state
  }
}

export default tokenReducer
