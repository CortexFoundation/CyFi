pragma solidity ^0.5.0;

// main: 0x24a42fD28C976A61Df5D00D0599C34c4f90748c8
// kovan: 0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5
contract LendingPoolAddressesProvider {
    function getLendingPool() public view returns (address);
    
    function getLendingPoolCore() public view returns (address); // main: 0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3
}

// main: 0x398eC7346DcD622eDc5ae82352F02bE94C62d119
// kovan: 0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c
contract LendingPool {
    function deposit(address _reserve, uint256 _amount, uint16 _referralCode)
        external
        payable;
}

