const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    console.log("deploying contract")
    const wbtcContract = await deploy("Wbtc", {
        from: deployer,
        args: [],
        log: true
    });
    console.log("deployed")
}
module.exports.tags = ["all","wbtc"]