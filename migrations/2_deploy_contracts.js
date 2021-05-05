var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
require("dotenv").config({ path: "../.env" });


module.exports = async function(deployer, network, accounts) {

	await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
	await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address);
	
	let tokenInstance = await MyToken.deployed();
	await tokenInstance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);

};
