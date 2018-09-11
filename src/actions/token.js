import {
  GET_ALL_TOKEN,
  REGISTER_TOKEN,
} from 'actions/actionTypes'

import { getParsedLocalStorageItem } from 'utils/misc'

export const getAllToken = () => ({
  type: GET_ALL_TOKEN,
})

export const registerToken = (token) => (dispatch) => {

  const newlyAdded = {
      name: token.name,
      fullname: token.fullname,
      contractAddress: token.address,
      decimal: token.decimal,
    }

  try {
    localStorage.setItem('savedTokenList', JSON.stringify([...getParsedLocalStorageItem('savedTokenList'), newlyAdded]))
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
