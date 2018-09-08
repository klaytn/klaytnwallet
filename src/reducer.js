import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from 'reducers/ui'
import token from 'reducers/token'

const reducer = combineReducers({
  routing: routerReducer,
  ui,
  token,
})

export default reducer
