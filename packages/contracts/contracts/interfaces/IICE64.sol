// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.14;

interface IICE64 {
    function getOriginalsBaseURI() external view returns (string memory);

    function getOriginalTokenId(uint256 editionId) external pure returns (uint256);

    function getRawEditionPhotoData(uint256 id) external view returns (bytes memory);

    function getEditionTokenId(uint256 id) external pure returns (uint256);

    function getMaxEditions() external view returns (uint256);

    function isEdition(uint256 id) external pure returns (bool);
}
