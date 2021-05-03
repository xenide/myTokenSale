const MyToken = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("You can define the name to be anything", (accounts) => {


  const [deployedAccount, secondAccount, thirdAccount] = accounts;

  let instance = await MyToken.deployed();

  it("All tokens should be in my account", async () => {
  
    let totalSupply = await instance.totalSupply();

    expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);

  });


  describe("Group of tests", () => {
  	it("Should...", async () => {


  		console.log(deployedAccount, secondAccount, thirdAccount);
  	}) 
  };
});
