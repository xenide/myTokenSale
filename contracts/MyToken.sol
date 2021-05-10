pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20Mintable {
    constructor() ERC20("StarDucks Cappucino Token", "CAPPU") public {
	    _setupDecimals(0);
    }
}