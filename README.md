## About project

- Solulab DAO operates as a governance mechanism based on the ERC20 standard. It provides a secure and efficient means for individuals with similar interests from various parts of the world to collaborate. Essentially, a DAO can be thought of as a digital business that is collectively owned and managed by its members. 

- With built-in treasuries, access to funds requires group approval, providing an added layer of security. The decision-making process is governed by proposals and voting, ensuring that every member of the organization has a say in its operations. 


## Table of Contents

- [Task Description](#task-description)
- [Tasks Included](#tasks-included)
- [Technologies Included](#technologies-included)
- [Install and run](#install-and-run)
- [Hardhat Setup](#hardhat-setup)

## Task Description
Create Smart Contract for a DAO using OpenZeppelin Library.

## Tasks Included

- Contract Functions 

- DAO members can create a proposals
- DAO members can vote on these proposals
- DAO members can executes these proposals 
- DAO members can cancel these proposals
- DAO admins can execute these proposals

 Other Task

- Deploy the contract using hardhat deployment script on Polygon Network.
- Write test cases using chai and mocha (testing libraries) to test the vulnerabilities in the contract. 
- Check the solidity coverage of the test cases passed and how much the contract is covered using these test cases.
- Once Compiled and deployed, verify the smart contract using the hardhat and polygon website API key. 
 
## Technologies Included

- Solidity for Smart contract
- OpenZeppelin for Contract References
- Hardhat for deploying contract on testnet Polygon
- Chai and Mocha for contract testing
- Solidity coverage for check of test cases

## Install and Run

To run this project, you must have the following installed:
- nodejs
- npm

Run npm install to install required dependencies.


$ npm install


## Clone repository


$ git clone https://github.com/codebyharshit/on-chain-dao-contracts.git


## Smart contract structure
 This repository uses openzeppelin's modular system of governance

- Governance: The core contract that contains all the logic and primitives
- Timelock: Allows multiple proposers and executors, in addition to the Governor itself.
- Governance Token: Extension of ERC20 to support Compound-like voting and delegation
- Treasury: Contract holding the funds inside it

## Smart contract Interaction

- Compile smart contracts

$  npx hardhat compile

- Test smart contracts

$   npx hardhat test


## Smart contract Deployment
- Create a .env file in the root directory and add the following variables

Account_1 = ""
Account_2 = ""
Account_3 = ""
Account_4 = ""
Account_5 = ""
GOERLI_HTTP_INFURA = ""
REACT_APP_DEPLOYER_PRIV_KEY=""
EXPLORER_APIKEY=""

## Supported networks for deployment

- localhost
- goerli
- polygon (mumbai testnet)

## Run Hardhat Test on Localhost

$   npx hardhat test


## Check test coverages

$   npx hardhat coverage


## Deploying Governance Smart Contract

$   npx hardhat run --network localhost scripts/deploy.js

## Smart contract verification

$   npx hardhat verify --network polygon DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"