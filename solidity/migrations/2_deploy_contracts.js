var fs = require('fs');

var ShadowToken = artifacts.require("./ShadowToken.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(ShadowToken)
};
