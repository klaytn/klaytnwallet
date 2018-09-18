import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from 'reducers/ui'
import token from 'reducers/token'
import block from 'reducers/block'

const reducer = combineReducers({
  routing: routerReducer,
  ui,
  token,
  block,
})

export default reducer
