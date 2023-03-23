const hre = require("hardhat");
const { ethers } = require('hardhat');
const { Wallet } = require("ethers");
const provider = hre.ethers.provider;

const privateKeys = [
  process.env.Account_1,
  process.env.Account_2,
  process.env.Account_3,
  process.env.Account_4,
  process.env.Account_5,
  // add more private keys as needed
];

const wallets = [];
privateKeys.forEach(privateKey => {
  const wallet = new ethers.Wallet(privateKey, provider);
  wallets.push(wallet);
});


async function main() {

    // Deploy the Token contract.
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("RDToken", "RDT", 100000);
    await token.deployed();
    console.log("-> Token contract is deployed at: ", token.address);

    // Deploy the TimeLock contract.
    const TimeLock = await ethers.getContractFactory("TimeLock");
    const timeLock = await TimeLock.deploy(1, [], ["0x0000000000000000000000000000000000000000"], wallets[0].address);
    await timeLock.deployed();
    console.log("-> TimeLock contract deployed at: ", timeLock.address);

    // Deploy the DAO contract.
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy(
        token.address,
        timeLock.address, 
    );
    await governance.deployed();
    console.log("-> Governance contract deployed at: ", governance.address);

    // Deploy the Treasury contract.
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy();
    await treasury.deployed();
    console.log("-> Treasury contract deployed at: ", treasury.address);

    // ---------------------------------------------------------------

    // Make TimeLock contract the owner of Treasury contract.
    await treasury.transferOwnership(timeLock.address);
    console.log("\n-> Transferred Treasury's ownership to TimeLock contract");

    // Make DAO contract the proposer of TimeLock contract.
    await timeLock.grantRole(await timeLock.PROPOSER_ROLE(), governance.address);
    console.log("-> Made DAO contract the PROPOSER of TimeLock contract");

    await timeLock.grantRole(await timeLock.EXECUTOR_ROLE(), governance.address);
    console.log("-> Made DAO contract the EXECUTOR of TimeLock contract");

    // Send some ethers to Treasury contract.
    const ethTxn = await wallets[0].sendTransaction({
        to: treasury.address,
        value: ethers.utils.parseEther("0.1")
    });
    await ethTxn.wait();
    console.log("-> Sent 0.1 ethers to Treasury contract");

    // Mint the BLZ voting tokens to other addresses.
    await token.mint(wallets[1].address, 10000);
    await token.mint(wallets[2].address, 10000);
    await token.mint(wallets[3].address, 10000);
    await token.mint(wallets[4].address, 10000);
    console.log("-> Minted BLZ voting tokens to other addresses.")

    // Delegate BLZ voting tokens through each account to itself.
    await token.connect(wallets[1]).delegate(wallets[1].address);
    await token.connect(wallets[2]).delegate(wallets[2].address);
    await token.connect(wallets[3]).delegate(wallets[3].address);
    await token.connect(wallets[4]).delegate(wallets[4].address);
    console.log("-> Delegated voting power of each address to itself");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })