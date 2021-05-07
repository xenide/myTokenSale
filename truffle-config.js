require("dotenv").config({ path: "./.env" });
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = process.env.MNEMONIC;
const accountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      network_id: 1337,
      host: '127.0.0.1'
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic : mnemonicPhrase,
          providerOrUrl : 'http://127.0.0.1:7545',
          addressIndex : accountIndex 
        });
      },
      network_id: 5777
    }
  },
  compilers: {
    solc: {
      version: "0.6.2", // A version or constraint - Ex. "^0.5.0"
      //                    // Can also be set to "native" to use a native solc
      // docker: <boolean>, // Use a version obtained through docker
      // parser: "solcjs",  // Leverages solc-js purely for speedy parsing
      // settings: {
      //   optimizer: {
      //     enabled: <boolean>,
      //     runs: <number>   // Optimize for how many times you intend to run the code
      //   },
      //   evmVersion: <string> // Default: "istanbul"
      // },
      // modelCheckerSettings: {
      //   // contains options for SMTChecker
      // }
    }
  }
};
