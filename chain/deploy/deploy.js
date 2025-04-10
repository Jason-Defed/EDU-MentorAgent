const hre = require("hardhat");

async function main() {
  const deployedContract = await hre.ethers.deployContract("MentorAgent");
  await deployedContract.waitForDeployment();
  console.log(`MentorAgentRevenueShare contract deployed to ${deployedContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
