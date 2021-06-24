require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "h6-fD6jl6POPMtAesQlS8G26I8j4sJt7";

const ROPSTEN_PRIVATE_KEY = "ba1b8bb9b2e2f83fb3c924fa0c8bdf9edf2ebc98925a4b57eb41d374849ed881";

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
