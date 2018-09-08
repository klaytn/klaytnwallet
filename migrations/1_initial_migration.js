const Migrations = artifacts.require('./Migrations.sol')
const RAS = artifacts.require('./RAS.sol')
const OKA = artifacts.require('./OKA.sol')
const IRE = artifacts.require('./IRE.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
  // deployer.deploy(RAS).then(function () {
  //   // Record recently deployed contract address to 'deployedAddress' file.
  //   fs.writeFile('deployedAddress', RAS.address, function (err) {
  //     if (err) throw err
  //     console.log(`The address ${RAS.address} is recorded on deployedAddress file`)
  //   })
  // })
  deployer.deploy(IRE).then(function () {
    // Record recently deployed contract address to 'deployedAddress' file.
    fs.writeFile('deployedAddress', RAS.address, function (err) {
      if (err) throw err
      console.log(`The address ${RAS.address} is recorded on deployedAddress file`)
    })
  })
};
