# Ropsten Address
pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Token {

  string public name = "minift";
  string public symbol = "MHT";

  uint256 public totalSupply = 1000000;

  address public owner;

  mapping(address => uint256) balances;

  /// @notice Executed when the contract is deployed
  constructor() {
    /// @notice Executed when the contract is deployed
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  /// @notice Allows transferring of tokens
  function transfer(address to, uint256 amount) external {

    console.log("Sender balance is %s tokens", balances[msg.sender]);
    console.log("Trying to send %s tokens to %s", amount, to);

    /// Check that sender has enough tokens
    require(balances[msg.sender] >= amount, "Not enough tokens");

    // Transfer the requested amount of tokens
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  /// @notice Get balances of an account
  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }
}
