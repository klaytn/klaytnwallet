import Cookies from 'js-cookie'

// Wrap js-cookie library for safe use.
const cookie = {
  setExpired: (name, value, expires) => Cookies.set(name, value, { expires }),
  get: (name) => Cookies.get(name),
}

export default cookie
