// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

// gebruik een standaard OpenZeppelin ERC721 contract als basis
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/cec0800c541c809f883a37f2dfb91ec4c90263c5/contracts/token/ERC721/ERC721.sol";

// gebruik een standaard OpenZeppelin counter contract voor het bijhouden van het aantal tokens
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/cec0800c541c809f883a37f2dfb91ec4c90263c5/contracts/utils/Counters.sol";

contract Nft is ERC721 {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) public { }

    function sendNFT(address player, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
