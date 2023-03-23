// require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-etherscan");
// // require("@nomiclabs/hardhat-waffle");
// require("solidity-coverage");

// require("dotenv").config();

// const privateKey = process.env.REACT_APP_DEPLOYER_PRIV_KEY;
// const alchemyProjectId = process.env.ALCHEMY_PROJECT_ID;
// const explorerApiKey = process.env.EXPLORER_APIKEY;

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   // solidity: "0.8.17",
//   solidity: {
//     version: "0.8.17",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   networks: {
//     hardhat: {
//       gas: 12000000,
//       gasPrice: 8000000000,
//       blockGasLimit: 0x1fffffffffffff,
//       allowUnlimitedContractSize: true,
//       timeout: 1800000,
//     },

//     ganache: {
//       url: "http://localhost:7545",
//       chainId: 1337
//     }
//   },

//   // etherscan: {
//   //   apiKey: {
//   //     polygonMumbai:explorerApiKey}
//   // }

// };


require('dotenv').config();
// require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    // rinkeby: {
    //   url: process.env.RINKEBY_HTTP_INFURA || '',
    //   accounts: {
    //     mnemonic: process.env.MNEMONICS,
    //   },
    //   chainId: 4,
    // },
    // goerli: {
    //   url: process.env.GOERLI_HTTP_INFURA || '',
    //   accounts: [process.env.Account_1],
    // },
    Mumbai: {
      url: process.env.GOERLI_HTTP_INFURA || '',
      accounts: [process.env.Account_1],
    },

    
  },
  etherscan: {
    apiKey: process.env.EXPLORER_APIKEY,
  }
};