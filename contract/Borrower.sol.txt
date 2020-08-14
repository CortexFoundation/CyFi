pragma solidity ^0.5.0;

// Deployed contract address: 0x502cf2862791a37559f7710b0a45439d7d6e0234

contract Borrower {

    address payable benefitAddress = 0x17Eb9e0c2924338FfEED678E7DB0363d9D5Ba3bB; // for temporary use
    mapping(address => uint256) ctxcBalance;
    mapping(address => uint256) daiDebt;

    function getBalance(address owner) public view returns(uint256) {
        return ctxcBalance[owner];
    }

    function getDebt(address owner) public view returns(uint256) {
        return daiDebt[owner];
    }

    function requestBorrowingPlans(uint8 _feePriority, uint8 _volumePriority)
        public pure returns(uint8 planNumber, address planAddress) { // from Cortex AI
        // temporary value
        planNumber = 0;
        planAddress = 0x17Eb9e0c2924338FfEED678E7DB0363d9D5Ba3bB;
        return (planNumber, planAddress);
    }

    function borrow(uint8 _feePriority, uint8 _volumePriority) public payable {
        ctxcBalance[msg.sender] = msg.value;
        uint8 planNumber;
        address planAddress;
        (planNumber, planAddress) = requestBorrowingPlans(_feePriority, _volumePriority);

        // temporary functions
        tempPlan();
        generateFakeValues();

        // borrow from plan 'planNumber'
        // request transfer borrowed token (DAI) from this to user

    }

    function payDebt() public payable {
        benefitAddress.transfer(daiDebt[msg.sender]); // actual implementation will send this to borrowing platform
        daiDebt[msg.sender] = 0; // or reduce by the amount of the client repay

    }

    function withdraw() public {
        require(daiDebt[msg.sender] == 0);
        msg.sender.transfer(ctxcBalance[msg.sender]);
    }

    function tempPlan() public {
        // does nothing
    }

    function generateFakeValues() public {
        daiDebt[msg.sender] = (ctxcBalance[msg.sender] * 11) / 10;
    }
}

contract Lender {
    mapping(address => uint256) ctxcBalance;
    mapping(address => uint256) daiDebt;

    function getBalance(address owner) public view returns(uint256) {
        return ctxcBalance[owner];
    }

    function getDebt(address owner) public view returns(uint256) {
        return daiDebt[owner];
    }

    function requestBorrowingPlans(uint8 _feePriority, uint8 _volumePriority) public pure returns(uint8, uint256) {
        uint8 sum = _feePriority + _volumePriority;
        return (sum, 2);
    }

    function borrow(address planAddress, uint8 _feePriority, uint8 _volumePriority) public payable {
        ctxcBalance[msg.sender] = msg.value;
        requestBorrowingPlans(_feePriority, _volumePriority);

        // borrow from plan x
        // request transfer borrowed token (DAI) from this to user

    }

    function repay() public {
        address payable sender = msg.sender;
        sender.transfer(ctxcBalance[sender]);
    }
}

// Different DApps' contract ABI

