pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title ShadowToken
 * @dev ERC20 that mints based on Ethereum deposits, and burns tokens when ether is withdrawn.
 */
contract ShadowToken is ERC20 {
    using SafeMath for uint256;

}
