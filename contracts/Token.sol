pragma solidity ^0.7.0;

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
