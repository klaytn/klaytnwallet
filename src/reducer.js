import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import wallet from 'reducers/wallet'
import ui from 'reducers/ui'

const reducer = combineReducers({
  routing: routerReducer,
  wallet,
  ui,
})

export default reducer
