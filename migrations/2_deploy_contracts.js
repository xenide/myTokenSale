var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");

module.exports = async function(deployer, network, accounts) {

	await deployer.deploy(MyToken, 1000000000);
	await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address);
	
	let tokenInstance = await MyToken.deployed();
	await tokenInstance.transfer(MyTokenSale.address, 1000000000);

};
