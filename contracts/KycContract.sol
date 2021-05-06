pragma solidity 0.6.2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
	mapping(address => bool) allowed;

	function setKycAllowed(address _add) public onlyOwner {
		allowed[_add] = true;
	}

	function setKycRevoked(address _add) public onlyOwner {
		allowed[_add] = false;
	}

	function kycCompleted(address _add) public view returns(bool) {
		return allowed[_add];
	}
}