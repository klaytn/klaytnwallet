import { onit } from 'klaytn/onit'

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
    const copyText = $input
    copyText.select()
    document.execCommand("copy");
  }
}
