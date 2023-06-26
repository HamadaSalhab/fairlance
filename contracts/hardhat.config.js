require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require('hardhat-deploy');
require("solidity-coverage");

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const MAINNET_FORK_URL = process.env.MAINNET_FORK_URL
const PLAYER1_PRIVATE_KEY = process.env.PLAYER1_PRIVATE_KEY
const PLAYER2_PRIVATE_KEY = process.env.PLAYER2_PRIVATE_KEY

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_FORK_URL,
        blockNumber: 14674245
      },
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY, PLAYER1_PRIVATE_KEY, PLAYER2_PRIVATE_KEY],
      chainId: 11155111,
      gasPrice: 35000000000,
      saveDeployments: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
