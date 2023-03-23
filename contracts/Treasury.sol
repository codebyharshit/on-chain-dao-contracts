// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;
    bool public isReleased;

    receive() external payable{}


    function sendEther (address payable payee, uint256 amount) external onlyOwner{
        require(address(this).balance >= amount, "No funds to withdraw");
        payable(payee).transfer(amount);
    }

    // function sendTokens(address _tokenAddress, address _to, uint256 _amount) external onlyOwner {
    //     require(
    //         IERC20(_tokenAddress).balanceOf(address(this)) >= _amount,
    //         "Insufficient ERC20 token Balance!"
    //     ); 

    //     IERC20(_tokenAddress).transfer(_to, _amount);
    // }
}
