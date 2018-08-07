import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import wallet from 'reducers/wallet'
import ui from 'reducers/ui'
import token from 'reducers/token'

const reducer = combineReducers({
  routing: routerReducer,
  wallet,
  ui,
  token,
})

export default reducer
