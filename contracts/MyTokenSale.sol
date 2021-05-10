pragma solidity 0.6.2;

import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "./KycContract.sol";

contract MyTokenSale is MintedCrowdsale {

    KycContract kyc;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }


    function _preValidatePurchase(address beneficiary, uint256 weiAmount) 
            internal view override {

        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(beneficiary), "KYC not completed. Not allowed");

        
    }
}