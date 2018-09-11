const Migrations = artifacts.require('./Migrations.sol')
const RAS = artifacts.require('./RAS.sol')
const OKA = artifacts.require('./OKA.sol')
const IRE = artifacts.require('./IRE.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
  deployer.deploy(RAS).then(function (d) {
    // Record recently deployed contract address to 'deployedAddress' file.
    fs.writeFile('deployedAddress', RAS.address, function (err) {
      if (err) throw err
      console.log(`The address ${RAS.address} is recorded on deployedAddress file`)
    })
  })
  .catch(console.log)
  deployer.deploy(IRE).then(function () {
    // Record recently deployed contract address to 'deployedAddress' file.
    fs.writeFile('deployedAddress', IRE.address, function (err) {
      if (err) throw err
      console.log(`The address ${IRE.address} is recorded on deployedAddress file`)
    })
  })
  .catch(console.log)
  deployer.deploy(OKA).then(function () {
    // Record recently deployed contract address to 'deployedAddress' file.
    fs.writeFile('deployedAddress', OKA.address, function (err) {
      if (err) throw err
      console.log(`The address ${OKA.address} is recorded on deployedAddress file`)
    })
  })
  .catch(console.log)
};
