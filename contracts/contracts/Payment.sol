// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Payment {
    // State variables
    address private immutable i_owner;
    mapping(bytes32 => address) public whitelistedTokens;

    //Events
    event SentFundsTo(address _reciever, uint256 _amount);
    event StartedProject(address _sender, uint256 _amount);

    //Errors
    error Payment__OnlyOwner();

    //Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert Payment__OnlyOwner();
        _;
    }

    // Constructor
    constructor() {
        i_owner = payable(msg.sender);
    }

    // External functions
    function whiteListToken(bytes32 symbol, address tokenAddress) external onlyOwner{
        whitelistedTokens[symbol] = tokenAddress;
    }
    
    function release(
        bytes32 symbol,
        address payable reciever,
        uint256 amount
    ) external onlyOwner {
        ERC20(whitelistedTokens[symbol]).transfer(reciever, amount);
        emit SentFundsTo(reciever, amount);
    }

    function startProject(uint256 amount, bytes32 symbol) external payable {
        ERC20(whitelistedTokens[symbol]).transferFrom(msg.sender, address(this), amount);
        emit StartedProject(msg.sender,amount);
    }

    // External view functions
    function getOwner() external view returns (address) {
        return i_owner;
    }
}
