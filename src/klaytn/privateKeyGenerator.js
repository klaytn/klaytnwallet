var etherWallet = require('ethereumjs-wallet')

module.exports = {
  generate: function() {
    var walletInstance = etherWallet.generate()
    return byteToHexString(walletInstance.getPrivateKey())
  }
}

function byteToHexString(uint8arr) {
 if (!uint8arr) {
   return ''
 }

 var hexStr = ''
 for (var i = 0; i < uint8arr.length; i++) {
   var hex = (uint8arr[i] & 0xff).toString(16)
   hex = (hex.length === 1) ? '0' + hex : hex
   hexStr += hex
 }

 return hexStr.toUpperCase()
}

function stringToHex(string) {
  var data = []
  for (var i = 0; i < string.length; i++) {
    data.push(url.charCodeAt(i))
  }
  return '0x' + byteToHexString(data)
}