const { ethers } = require("hardhat");

const GOVERNANCE_ADDRESS = "0xd16f036f84D976d40b01d181A589Cfb05a750232";
const TREASURY_ADDRESS = "0x9b89D29283d3A30b0a17Aa2dAeDC6Bc334bCbf66";
const propId = '33641313866075984148224638813222615639233860665356148720434121504785705143766';


async function main() {
    const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.attach(GOVERNANCE_ADDRESS);

    // Now vote in support of proposal.
    await governance.connect(addr1).castVote(propId, 1);
    await governance.connect(addr2).castVote(propId, 1);
    await governance.connect(addr3).castVote(propId, 1);
    await governance.connect(addr4).castVote(propId, 1);
    await governance.connect(addr5).castVote(propId, 1);
    console.log("-> Voting on proposal completed");
    console.log("Proposal state: ", await dao.state(propId));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })