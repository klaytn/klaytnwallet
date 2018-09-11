import {
  REGISTER_TOKEN,
} from 'actions/actionTypes'

import { getParsedLocalStorageItem } from 'utils/misc'
import tokenMetaList from 'utils/tokenMetaList'

const initialState = {
  tokenList: [...tokenMetaList, ...getParsedLocalStorageItem('savedTokenList')],
}

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_TOKEN:
      return {
        ...state,
        tokenList: [...state.tokenList, action.payload.token],
      }
    default:
      return state
  }
}

export default tokenReducer
