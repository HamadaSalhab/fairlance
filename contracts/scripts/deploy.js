const { ethers } = require("hardhat");

async function main() {
  const PaymentContractFactory = await ethers.getContractFactory(
    "Payment"
  );
  console.log('Deploying contract ...')
  const PaymentContract = await PaymentContractFactory.deploy();
  await PaymentContract.waitForDeployment();
  
}

main().then(() => process.exit(0)).catch((error) => {
  console.log(error);
  process.exit(1);
});