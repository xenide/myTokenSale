var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
var Kyc        = artifacts.require("KycContract.sol");
require("dotenv").config({ path: "../.env" });


module.exports = async function(deployer, network, accounts) {

	await deployer.deploy(MyToken);
	await deployer.deploy(Kyc, accounts[0]);
	await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address, Kyc.address);
	
	let tokenInstance = await MyToken.deployed();
	// console.log(tokenInstance);

	let result = await tokenInstance.contract.methods.isMinter(accounts[0]).call();

	console.log("accounts[0] isMinter: ", result);
	await tokenInstance.contract.methods.addMinter(MyTokenSale.address).send({ from: accounts[0] });
	await tokenInstance.contract.methods.renounceMinter().send({ from: accounts[0] });

	result = await tokenInstance.contract.methods.isMinter(accounts[0]).call();

	console.log("accounts[0] isMinter: ", result);

	result = await tokenInstance.contract.methods.isMinter(MyTokenSale.address).call();
	console.log("MyTokenSale isMinter: ", result);

};
