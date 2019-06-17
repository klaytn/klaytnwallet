import {
  GET_ALL_TOKEN,
  REGISTER_TOKEN,
  RESET_TOKEN,
  TOGGLE_TOKEN_ADD_MODE,
  SET_MY_TOKEN_BALANCES_BY_NAME,
} from 'actions/actionTypes'

import { getParsedSessionStorageItem } from 'utils/misc'

export const getAllToken = () => ({
  type: GET_ALL_TOKEN,
})
export const resetToken = () => ({
  type: RESET_TOKEN,
})
export const registerToken = (token) => (dispatch) => {

  const newlyAdded = {
      name: token.name,
      fullname: token.fullname,
      contractAddress: token.address,
      decimal: token.decimal,
    }

  try {
    sessionStorage.setItem('savedTokenList', JSON.stringify([...getParsedSessionStorageItem('savedTokenList'), newlyAdded]))
  } catch (e) {
    console.log(e)
  }

  return dispatch({
    type: REGISTER_TOKEN,
    payload: {
      token: {
        fullname: token.fullname,
        name: token.name,
        decimal: token.decimal,
        contractAddress: token.address,
      }
    },
  })
}
export const toggleTokenAddMode = () => ({
  type: TOGGLE_TOKEN_ADD_MODE,
})

export const setMyTokenBalancesByName = (balancesByName) => ({
  type: SET_MY_TOKEN_BALANCES_BY_NAME,
  payload: {
    balancesByName,
  }
})
