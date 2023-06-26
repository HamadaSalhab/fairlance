const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { expect, assert } = require("chai");
require("dotenv").config();

const PaymentAddress = process.env.PaymentAddress
const WbtcAddress = process.env.WbtcAddress

describe("Payment", () => {
    let accounts, PaymentContract, wbtcContract, WBTCSymbol;
    beforeEach(async () => {
        accounts = await ethers.getSigners();
        await deployments.fixture(["all"]);
        PaymentContract = await ethers.deployContract("Payment", accounts[0]);
        wbtcContract = await ethers.deployContract("Wbtc", accounts[1]);

        await wbtcContract.connect(accounts[1]).transfer(accounts[2].address, 1000);
        await wbtcContract.connect(accounts[1]).approve(
            PaymentContract.target,
            4000
        );
        await wbtcContract.connect(accounts[2]).approve(
            PaymentContract.target,
            1000
        );

        WBTCSymbol = ethers.encodeBytes32String('Wbtc');
        const connectedContract = PaymentContract.connect(accounts[0])
        await connectedContract.whiteListToken(WBTCSymbol, wbtcContract.target)
    });


    describe("deployment", () => {
        it("should mint correctly to wallet 1", async () => {
            const balance = await wbtcContract.balanceOf(accounts[1]);
            assert.equal(balance.toString(), "4000");
        });
        it("should transfer 1000 to wallet 2", async () => {
            const account2Balance = await wbtcContract.balanceOf(accounts[2]);
            assert.equal(account2Balance.toString(), "1000");
        });
        it("should whitelist wbtc", async () => {
            const whiteListedToken = await PaymentContract.whitelistedTokens(WBTCSymbol);
            assert.equal(whiteListedToken, wbtcContract.target);
        });
    });

    describe("Employers can deposit money", async () => {
        it("should transfer money from account 1 to the smart contract", async () => {
            await PaymentContract.connect(accounts[1]).startProject(100, WBTCSymbol);
            const endingBalance = await wbtcContract.balanceOf(accounts[1]);
            assert.equal(endingBalance.toString(), "3900");
            const contractBalance = await wbtcContract.balanceOf(PaymentContract.target);
            assert.equal(contractBalance.toString(), "100");
        });
        it("should allow the contract to resend the money from contract to account 1", async () => {
            await PaymentContract.connect(accounts[1]).startProject(100, WBTCSymbol);
            await PaymentContract.release(WBTCSymbol, accounts[1], 100);
            const newBalance = await wbtcContract.balanceOf(accounts[1]);
            assert.equal(newBalance.toString(), "4000");
        });
        it("should not allow normal users to release the money", async () => {
            await PaymentContract.connect(accounts[1]).startProject(100, WBTCSymbol);
            await expect(PaymentContract.connect(accounts[2]).release(WBTCSymbol, accounts[1], 100))
                .to.be.revertedWithCustomError(PaymentContract, "Payment__OnlyOwner");
            await expect(PaymentContract.connect(accounts[1]).release(WBTCSymbol, accounts[1], 100))
                .to.be.revertedWithCustomError(PaymentContract, "Payment__OnlyOwner");
        });
    });
    describe("getters are working", async () => {
        it("should return the contract owner correctly", async () => {
            const owner = await PaymentContract.getOwner();
            assert.equal(owner, accounts[0].address);
        });
    });
    describe("Events are working", async () => {
        it("should emit event upon starting project", async () => {
            await expect(PaymentContract.connect(accounts[1]).startProject(100, WBTCSymbol))
                .to.emit(PaymentContract, "StartedProject")
                .withArgs(accounts[1].address, 100);
        });
        it("should emit event upon release", async () => {
            await PaymentContract.connect(accounts[1]).startProject(100, WBTCSymbol);
            await expect(PaymentContract.release(WBTCSymbol, accounts[1], 100))
                .to.emit(PaymentContract, "SentFundsTo")
                .withArgs(accounts[1].address, 100);
        });
    });
});