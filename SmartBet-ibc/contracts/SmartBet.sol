// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SmartBet {
    address public manager;
    address payable[] public players;
    mapping(address => bool) public playerChoices;
    mapping(address => uint) public playerBets;

    constructor() {
        manager = msg.sender;
    }

    function placeBet(bool choice) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        players.push(payable(msg.sender));
        playerChoices[msg.sender] = choice;
        playerBets[msg.sender] = msg.value;
    }

    function random() internal view returns (bool) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
        return (randomNumber % 2 == 0);
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function.");
        _;
    }

    function determineWinner() public onlyManager {
        require(players.length > 0, "No players have placed a bet.");
        bool betResult = random();
        for (uint i = 0; i < players.length; i++) {
            address payable player = players[i];
            bool playerChoice = playerChoices[player];
            if (playerChoice == betResult) {
                player.transfer(playerBets[player] * 2);
            }
        }
        delete players;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
