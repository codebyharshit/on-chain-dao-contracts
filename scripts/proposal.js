const { ethers } = require("hardhat");
const GOVERNANCE_ADDRESS = "0xd16f036f84D976d40b01d181A589Cfb05a750232";
const TREASURY_ADDRESS = "0x9b89D29283d3A30b0a17Aa2dAeDC6Bc334bCbf66";

async function main() {
    const [owner] = await ethers.getSigners();

    const Governance  = await ethers.getContractFactory("Governance");
    const governance = await Governance.attach(GOVERNANCE_ADDRESS);

    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.attach(TREASURY_ADDRESS);

    // Create a proposal.
    const proposalTxn = await governance.propose(
        [TREASURY_ADDRESS],
        [0],
        [await treasury.interface.encodeFunctionData("sendEther", [owner.address, ethers.utils.parseUnits("3", 18)])],
        "Sending ether!"
    );
    const txn = await proposalTxn.wait();
    const proposalId = txn.events[0].args.proposalId;
    console.log("/n -> Created a proposal to send 3 ethers to owner with id: ", proposalId);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })