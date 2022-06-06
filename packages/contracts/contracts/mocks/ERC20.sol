// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ERC20} from "@rari-capital/solmate/src/tokens/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("MockERC20", "MOCK", 18) {}

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
