const hre = require("hardhat");

async function main() {
    const SmartBet = await hre.ethers.getContractFactory("SmartBet");
    const smartBet = await SmartBet.deploy();

    await smartBet.deployed();

    console.log("SmartBet deployed to:", smartBet.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
