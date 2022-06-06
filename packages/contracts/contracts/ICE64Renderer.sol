// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.14;

import {Owned} from "@rari-capital/solmate/src/auth/Owned.sol";
import {XQSTGFX} from "@exquisite-graphics/contracts/contracts/XQSTGFX.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {DynamicBuffer} from "@divergencetech/ethier/contracts/utils/DynamicBuffer.sol";
import {Base64} from "./Base64.sol";

import {IICE64} from "./interfaces/IICE64.sol";

/// @title "to be named", photo collection metadata & renderer
/// @author Sam King (samkingstudio.eth)
contract ICE64Renderer is Owned {
    using Strings for uint256;
    using DynamicBuffer for bytes;

    /* ------------------------------------------------------------------------
                                   S T O R A G E
    ------------------------------------------------------------------------ */

    /// @dev The address of the storage/minting contract
    IICE64 public ice64;
    XQSTGFX public xqstgfx;

    /* ------------------------------------------------------------------------
                                      I N I T
    ------------------------------------------------------------------------ */

    /// @param owner The owner of the contract upon deployment
    /// @param ice64_ The address of the storage/minting contract
    constructor(
        address owner,
        address ice64_,
        address xqstgfx_
    ) Owned(owner) {
        ice64 = IICE64(ice64_);
        xqstgfx = XQSTGFX(xqstgfx_);
    }

    /* ------------------------------------------------------------------------
                                 R E N D E R I N G
    ------------------------------------------------------------------------ */

    /// @notice Draws an SVG from data in the .xqst format to a string
    /// @param data The photo data in .xqst format
    function drawSVGToString(bytes memory data) public view returns (string memory) {
        return string(drawSVGToBytes(data));
    }

    /// @notice Draws an SVG from data in the .xqst format to bytes
    /// @param data The photo data in .xqst format
    function drawSVGToBytes(bytes memory data) public view returns (bytes memory) {
        string memory rects = xqstgfx.drawRects(data);
        bytes memory svg = DynamicBuffer.allocate(2**19);

        svg.appendSafe(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" width="100%" height="100%" version="1.1" viewBox="0 0 128 128" fill="#fff"><rect width="128" height="128" fill="#fff" /><g transform="translate(32,32)">',
                rects,
                "</g></svg>"
            )
        );

        return svg;
    }

    /// @notice Renders metadata for a given token id
    /// @dev If the photo is an edition, then render an SVG, otherwise return the constructed URI
    /// @param id The token id to render
    function tokenURI(uint256 id) public view returns (string memory) {
        if (!ice64.isEdition(id)) {
            return string(abi.encodePacked(ice64.getOriginalsBaseURI(), id.toString()));
        }

        uint256 originalId = ice64.getOriginalTokenId(id);
        string memory originalIdStr = originalId.toString();

        bytes memory data = ice64.getRawEditionPhotoData(originalId);
        bytes memory svg = drawSVGToBytes(data);

        bytes memory svgBase64 = DynamicBuffer.allocate(2**19);
        svgBase64.appendSafe("data:image/svg+xml;base64,");
        svgBase64.appendSafe(bytes(Base64.encode(svg)));

        bytes memory json = DynamicBuffer.allocate(2**19);
        bytes memory jsonBase64 = DynamicBuffer.allocate(2**19);

        json.appendSafe(
            abi.encodePacked(
                '{"symbol":"PHOTO","name":"Photo Collection #',
                originalIdStr,
                ' Edition","description":"A tiny edition of Photo Collection #',
                originalIdStr,
                ". Edition of ",
                ice64.getMaxEditions().toString(),
                ', 64x64px in size, stored fully on-chain.","image":"',
                string(svgBase64),
                '","external_url":"https://samking.photo/photo/',
                originalIdStr,
                '","attributes":[]}'
            )
        );

        jsonBase64.appendSafe("data:application/json;base64,");
        jsonBase64.appendSafe(bytes(Base64.encode(json)));

        return string(jsonBase64);
    }
}
