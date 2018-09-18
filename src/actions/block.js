import {
  GET_VALIDATORS,
} from 'actions/actionTypes'

export const getValidators = () => dispatch => {

  return fetch('http://dev.scope.klaytn.com/api/validators', { method: 'POST' })
    .then(res => res.json())
    .then(({ result }) => {

      const validatorTable = result.reduce((acc, cur) => {
        acc[cur.to] = cur.id
        return acc
      }, {})

      dispatch({
        type: GET_VALIDATORS,
        payload: { validators: validatorTable }
      })
    })
}
