// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ERC721} from "@rari-capital/solmate/src/tokens/ERC721.sol";

contract MockERC721 is ERC721 {
    constructor() ERC721("MockERC721", "MOCK") {}

    function tokenURI(uint256 id) public view virtual override returns (string memory) {}

    function mint(uint256 id) public {
        _mint(msg.sender, id);
    }
}
