require("dotenv").config({ path: "../.env" });

const MyTokenSale = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken");
const Kyc = artifacts.require("KycContract");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("My token sale test", (accounts) => {

	const [ initialHolder, recipient, anotherAccount ] = accounts;

	it("Should not have any tokens in the deployer account ", async () => {
	    let instance = await MyToken.deployed();
	    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
	});

	it("all tokens should be in the token sale smart contract", async () => {
	    let tokenContractInstance = await MyToken.deployed();
	    let saleContractInstance = await MyTokenSale.deployed();

	    const totalTokens = new BN( process.env.INITIAL_TOKENS );

	    // .to .be .been .is .that .and .have .with .at .of .same
	    // Are just syntactic sugar
	    // They don't have any actual effect
	    return expect(tokenContractInstance.balanceOf(saleContractInstance.address)).
	    to.eventually.be.a.bignumber.equal(totalTokens);
	});

	it("should be possible to buy the tokens", async () => {
	    let tokenContractInstance = await MyToken.deployed();
	    let saleContractInstance = await MyTokenSale.deployed();
	    let kycContractInstance = await Kyc.deployed()

	    await kycContractInstance.setKycAllowed(recipient, {from: initialHolder});

	    expect(saleContractInstance.
	    		sendTransaction( {from: recipient, 
	    				   value: web3.utils.toWei("100","wei")}))
	    		.to.be.eventually.fulfilled;

	    // Seems that for each 'it' clause 
	    // We should only have one expect statement
	    // Else something will go wrong 
 		return expect(tokenContractInstance.balanceOf(recipient)).
	  	to.eventually.be.a.bignumber.equal(new BN(web3.utils.toWei("100","wei")));
	});

});