import {
  finishLoading,
  startLoading,
  openPopup,
  closePopup,
  showToast,
  hideToast,
  keyRemove,
  keyRemoveEnd,
} from 'actions/ui'
import store from '../store'

export const ui = {
  startLoading: () => store.dispatch(startLoading()),
  finishLoading: () => store.dispatch(finishLoading()),
  openPopup: (popup) => store.dispatch(openPopup(popup)),
  closePopup: () => store.dispatch(closePopup()),
  showToast: (toast) => store.dispatch(showToast(toast)),
  hideToast: () => store.dispatch(hideToast()),
  keyRemove: () => store.dispatch(keyRemove()),
  keyRemoveEnd: () => store.dispatch(keyRemoveEnd()),
}

if (DEV) {
  window.ui = ui
}
export const closeBrowser = (event)=> {
  event.returnValue = 'Leave Page?';
}

export default ui

