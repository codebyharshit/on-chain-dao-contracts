const { ethers } = require("hardhat");
const hre = require("hardhat");
const { Wallet } = require("ethers");

const GOVERNANCE_ADDRESS = "0xd16f036f84D976d40b01d181A589Cfb05a750232";

const propId = "33641313866075984148224638813222615639233860665356148720434121504785705143766"
  
async function main() {

  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = await Governance.attach(GOVERNANCE_ADDRESS);

  const checkState = await governance.state(propId);
  console.log(checkState);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

