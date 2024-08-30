// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./verifier.sol";

/*
What does current iteration needs?
1. Users Create campaign using this contract
2. Campaign deatils: Owner, Spending limit [Updatable], Ads [Updatable], Region, Name, isActive (Bool)
 - Issue: How do we know if we hit. spending limit. Sol: Use FE 
*/

contract AdBase {
    struct Campaign {
        address creator;
        string region;
        string campaignName;
        uint256 spendingLimit;
        string[] adCIDs;
        bool isActive;
    }

    address public org;
    uint256 public campaignCounter;

    PlonkVerifier public verifier;

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public userCampaigns;
    mapping(address => uint256) public payouts;

    uint256 public CPC = 10000 gwei; // approx 0.3 USD
    event CampaignCreated(
        uint256 campaignId,
        address creator,
        string region,
        string campaignName,
        uint256 spendingLimit,
        string[] adCIDs
    );

    event Payout(address developer, uint256 amount);

    modifier onlyOrg() {
        require(msg.sender == org, "Caller is not the organization");
        _;
    }

    constructor(address _org, address _verifier) {
        org = _org;
        campaignCounter = 0;
        verifier = PlonkVerifier(_verifier);
    }

    function createCampaign(
        string memory _region,
        string memory _campaignName,
        uint256 _spendingLimit,
        string[] memory _adCIDs
    ) external payable {
        require(msg.value == _spendingLimit, "Invalid Amount");
        campaigns[campaignCounter] = Campaign(
            msg.sender,
            _region,
            _campaignName,
            _spendingLimit,
            _adCIDs,
            true
        );
        userCampaigns[msg.sender].push(campaignCounter);
        campaignCounter++;
        emit CampaignCreated(
            campaignCounter,
            msg.sender,
            _region,
            _campaignName,
            _spendingLimit,
            _adCIDs
        );
    }

    function pauseCampaign(
        uint256 campaignId,
        uint256 _spentAmount
    ) external payable onlyOrg {
        Campaign storage thisCampaign = campaigns[campaignId];
        (bool sent, ) = msg.sender.call{
            value: (thisCampaign.spendingLimit - _spentAmount)
        }("");
        require(sent, "Failed to withdraw and pasue campaign!!");
    }

    // implement aggregation proof here
    function payout(
        address developer,
        uint256 amount,
        bytes memory proof,
        uint[] memory pubSignals
    ) external onlyOrg {
        require(address(this).balance > amount, "Not enough balance");
        require(verifier.verifyProof(proof, pubSignals), "Invalid Proof");
        (bool sent, ) = developer.call{value: amount}("");
        payouts[developer] = amount;
        require(sent, "Failed to Transfer!!");
    }

    // Utility function to get campaigns created by a user
    function getUserCampaigns(
        address user
    ) external view returns (uint256[] memory) {
        return userCampaigns[user];
    }

    function getAds(
        uint256 campaignId
    ) external view returns (string[] memory) {
        return campaigns[campaignId].adCIDs;
    }
}
