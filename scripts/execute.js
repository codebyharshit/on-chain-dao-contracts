const { ethers } = require("hardhat");
const GOVERNANCE_ADDRESS = '0xd16f036f84D976d40b01d181A589Cfb05a750232';
const TREASURY_ADDRESS = '0x9b89D29283d3A30b0a17Aa2dAeDC6Bc334bCbf66';
const propId = '33641313866075984148224638813222615639233860665356148720434121504785705143766';

async function main() {
    const [owner] = await ethers.getSigners();

    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.attach(GOVERNANCE_ADDRESS);

    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.attach(TREASURY_ADDRESS);

    // Now execute the proposal.
    const executeTxn = await governance.execute(
        [TREASURY_ADDRESS],
        [0],
        [await treasury.interface.encodeFunctionData("sendEther", [owner.address, ethers.utils.parseUnits("3", 18)])],
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sending ether!"))
    );
    await executeTxn.wait();
    console.log("Proposal state: ", await governance.state(propId));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
