import { onit } from 'klaytn/onit'
import copyToClipboard from 'copy-to-clipboard'

String.prototype.lpad = function(padString, length) {
  var str = this
  while (str.length < length) str = padString + str
  return str
}

export const get = (f, fallbakValue) => {
  try {
    return f()
  } catch (e) {
    return fallbakValue || ''
  }
}

export const toLowerCase = (str, from) => str.slice(0, from)
  + str.slice(from).toLowerCase()

export const bytesToString = (bytes) => web3.utils.toAscii(bytes)

export const numberToRGBHex = (numString) => `#${Number(numString).toString(16).slice(0, 6).lpad('0', 6)}`

export const toDecimal = (bignumber) => web3.utils.toDecimal(bignumber)

function byteToHexString(uint8arr) {
  if (!uint8arr) {
    return ''
  }

  let hexStr = ''
  for (let i = 0; i < uint8arr.length; i++) {
    let hex = (uint8arr[i] & 0xff).toString(16)
    hex = (hex.length === 1) ? `0${hex}` : hex
    hexStr += hex
  }

  return hexStr.toUpperCase()
}

export const stringToHex = (string) => {
  const data = []
  for (let i = 0; i < string.length; i++) {
    data.push(string.charCodeAt(i))
  }
  return `0x${byteToHexString(data)}`
}

export const download = (text, name) => {
  if (document) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([text],
      { type:`text/${name.split(".").pop()}` })
    )
    a.download = name
    a.click()
  }
}

export const copy = ($input) => {
  if (document) {
    let copyText = $input
    if (copyText && copyText.type === 'password') {
      copyToClipboard(copyText.value)
      return
    }
    copyText.select()
    document.execCommand("copy");
  }
}

export const detectMobile = () => {
  if (navigator) {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) { return true }
    else {
      return false
    }
  }
}

export const isMobile = detectMobile()

export const getParsedLocalStorageItem = (item) => {
  try {
    return JSON.parse(localStorage.getItem(item)) || []
  } catch (e) {
    console.log(e)
    return []
  }
}

export const limit6Decimal = (valueStr) => {
  const [ integerValue, decimalValue ] = String(valueStr).split('.')
  if (decimalValue && decimalValue.length > 6) {
    return integerValue + '.' + decimalValue.slice(0, 6)
  }
  return valueStr
}

export const addCommas = (num: number | string): string => {
  const numString = typeof num === 'number' ? num.toString() : num
  const splitedNum = numString.split('.')
  let int = splitedNum[0]
  const decimal = splitedNum.length > 1 ? `.${splitedNum[1]}` : ''
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(int)) {
    int = int.replace(rgx, '$1,$2')
  }
  return int + decimal
}