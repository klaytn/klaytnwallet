import {
  GET_VALIDATORS,
} from 'actions/actionTypes'

const initialState = {
  validators: [],
}

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VALIDATORS:
      return {
        ...state,
        validators: action.payload.validators,
      }
    default:
      return state
  }
}

export default blockReducer
