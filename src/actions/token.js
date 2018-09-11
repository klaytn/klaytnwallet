import {
  GET_ALL_TOKEN,
  REGISTER_TOKEN,
} from 'actions/actionTypes'

export const getAllToken = () => ({
  type: GET_ALL_TOKEN,
})

export const registerToken = (token) => ({
  type: REGISTER_TOKEN,
  payload: {
    token: {
      fullname: token.fullname,
      name: token.name,
      decimal: token.decimal,
      contractAddress: token.address,
    }
  }
})
