import {
  finishLoading,
  startLoading,
  openPopup,
  closePopup,
  showToast,
  hideToast,
} from 'actions/ui'
import store from '../store'

export const ui = {
  startLoading: () => store.dispatch(startLoading()),
  finishLoading: () => store.dispatch(finishLoading()),
  openPopup: (popup) => store.dispatch(openPopup(popup)),
  closePopup: () => store.dispatch(closePopup()),
  showToast: (toast) => store.dispatch(showToast(toast)),
  hideToast: () => store.dispatch(hideToast()),
}

if (DEV) {
  window.ui = ui
}

export default ui
