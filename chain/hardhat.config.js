require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: {
    version: "0.8.22",
    settings: {
    },
  },
  paths: {
    artifacts: "./src",
  },
  sourcify: {
    enabled: false,
  },
  networks: {
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      opencampus: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://opencampus-codex.blockscout.com",
        },
      },
    ],
  },
};