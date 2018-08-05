const Migrations = artifacts.require('./Migrations.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
  // deployer.deploy(KittyCore).then(function () {
  //   // Record recently deployed contract address to 'deployedAddress' file.
  //   fs.writeFile('deployedAddress', KittyCore.address, function (err) {
  //     if (err) throw err
  //     console.log(`The address ${KittyCore.address} is recorded on deployedAddress file`)
  //   })
  // })
};
