import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import dotenv from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
      blockGasLimit: 100000000,
      accounts: {
        count: 70,
      },
    },
    rinkeby: {
      url: process.env.ETHEREUM_RINKEBY_RPC_URL || "",
      accounts: process.env.ETHEREUM_RINKEBY_DEPLOYER_PRIVATE_KEY
        ? [process.env.ETHEREUM_RINKEBY_DEPLOYER_PRIVATE_KEY]
        : [],
    },
    mainnet: {
      url: process.env.ETHEREUM_MAINNET_RPC_URL || "",
      accounts: process.env.ETHEREUM_MAINNET_DEPLOYER_PRIVATE_KEY
        ? [process.env.ETHEREUM_MAINNET_DEPLOYER_PRIVATE_KEY]
        : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 50,
    token: "ETH",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
    excludeContracts: ["mocks/"],
  },
  abiExporter: {
    runOnCompile: true,
    only: ["ICE64.sol", "ICE64DataStore.sol", "ICE64Renderer.sol"],
  },
};
