require("dotenv").config({ path: "../.env" });
const MyToken = artifacts.require("MyToken");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("You can define the name to be anything", (accounts) => {

  const [ initialHolder, recipient, anotherAccount ] = accounts;

  beforeEach(async () => {
    this.myToken = await MyToken.new(process.env.INITIAL_TOKENS); 
  });


  it("All tokens should be in my account", async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();

    expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);

  });


  describe("Group of tests", () => {
  	it("I can send tokens from Account 1 to Account 2", async () => {
      const sendTokens = 1;
      let instance = this.myToken;
      let totalSupply = await instance.totalSupply();
      expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
      expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;      
      expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
      expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It's not possible to send more tokens than account 1 has", async () => {
      let instance = this.myToken;
      let balanceOfAccount = await instance.balanceOf(initialHolder);

      expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

      //check if the balance is still the same
      expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
  });
});
