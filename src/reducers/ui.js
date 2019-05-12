import {
  START_LOADING,
  FINISH_LOADING,
  OPEN_POPUP,
  CLOSE_POPUP,
  SHOW_TOAST,
  HIDE_TOAST,
  KEY_REMOVE,
  KEY_REMOVE_END,
} from 'actions/actionTypes'

const initialState = {
  isLoading: false,
  popup: null,
  toast: null,
  keyRemove: false,
}

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case OPEN_POPUP:
      return {
        ...state,
        popup: action.payload.popup,
      }
    case CLOSE_POPUP:
      return {
        ...state,
        popup: null,
      }
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload.toast,
      }
    case HIDE_TOAST:
      return {
        ...state,
        toast: null,
      }
    case KEY_REMOVE:
      return {
        ...state,
        keyRemove: true,
      }
    case KEY_REMOVE_END:
      return {
        ...state,
        keyRemove: false,
      }      
    default:
      return state
  }
}

export default walletReducer
