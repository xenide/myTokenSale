import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: '0x0' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.getChainId();

      this.myToken = new this.web3.eth.Contract(
          MyToken.abi,
          MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.myTokenSale = new this.web3.eth.Contract(
          MyTokenSale.abi,
          MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address
      );
      this.kycContract = new this.web3.eth.Contract(
          KycContract.abi,
          KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );
      console.log(KycContract.networks);

      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleSubmit = async () => {
    const { kycAddress } = this.state;

    console.log(this.kycContract);
    let result = await this.kycContract.methods.setKycAllowed(kycAddress).send({ from: this.accounts[0] });
    console.log(result);
    alert(kycAddress + " has been whitelisted!");
  };

  handleCheckAddress = async () => {
    const { checkAddress } = this.state;

    let result = await this.kycContract.methods.kycCompleted(checkAddress).call();
    console.log(result);
  };


  // Omg, this function did not work when it was defined as
  // handleInputChange (event) {}
  // 'this' would be undefined
  // But when we changed to the current definition, it works
  // Why? 
  // Something to do with binding the 'this' context with the function
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  
  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Starfucks KapooChino Kafe</h1>
        <p>You can now buy poo cafe with real fucks!</p>
        <h2>Enable yo account</h2>
        <p>
          Address to allow:
        </p>
          <input type="text" name="kycAddress" onChange={this.handleInputChange} value={this.state.kycAddress} /> 
        <button onClick={this.handleSubmit}>Submit Address for KYC</button>
      
        <br/>

        <p>
          Check status of address:
          <input type="text" name="checkAddress" onChange={this.handleInputChange} value={this.state.checkAddress} /> 
          <button onClick={this.handleCheckAddress}>Check</button>
        </p>
      </div>
    );
  };

 
}

export default App;
