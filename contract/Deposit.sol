pragma solidity ^0.5.0;
import "./CEC.sol";

contract Deposit {

    address tokenAddress = 0x80218597090a43429567827E2E6988fCa04A351d;
    ICEC private token = ICEC(tokenAddress);
    // "1000000000000000000" = 1
    mapping (address => uint256) balance;

    function getBalance() public view returns (uint256) {
        return balance[msg.sender];
    }

    function getBalanceOf(address _address) public view returns (uint256) {
        return balance[_address];
    }

    // need approve first
    function depositCEC(uint256 _value) public returns (bool) {
        require(token.transferFrom(msg.sender, this, _value));
        balance[msg.sender] += _value;
        return true;
    }

    function withdrawCEC(uint256 _value) public returns (bool) {
        require(balance[msg.sender] >= _value);
        require(token.transfer(msg.sender, _value));
        balance[msg.sender] -= _value;
        return true;
    }

}
