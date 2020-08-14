pragma solidity ^0.5.0;


interface EIP {
    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}


contract CompoundToken is EIP {
    function mint(uint256) public returns (uint);
    function redeem(uint256) public returns (uint);
    function redeemUnderlying(uint256) public returns (uint);
    function exchangeRateCurrent() public returns (uint256);
}

contract FulcrumToken is EIP {
    function mint(address, uint256) external returns (uint256); // return minted amount
    function mintWithEther(address) external payable returns (uint256); // return minted amount
    function burn(address, uint256) external returns (uint256); // return redeemed
    function burnToEther(address, uint256) external returns (uint256); // return redeemed amount
    function tokenPrice() public view returns (uint256);
}

contract AaveToken is EIP {
    function redeem(uint256 _amount) external;
    function isTransferAllowed(address user, uint256 amount) public view returns (bool);
    function balanceOf(address _user) public view returns(uint256);
    function principalBalanceOf(address _user) external view returns(uint256);
}