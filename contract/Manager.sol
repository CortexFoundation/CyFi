pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2;
import "./Controller.sol";
import "./TokenInterface.sol";
// import "./AddressesCenter.sol";

// current testing(main): 0xbd9c8Cf72492Ba529D7a0d4356e31977E2097a47
// current testing(kovan): 0x7d8C2bc99BE933dc253b411fE3c947D7a99Eed7A
// ---------------------
// From Jan to July, with 1.6% profit (https://etherscan.io/token/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359?a=0x064b929af73bb0e229ad07efc15d8d75d0a8feb7)
// last deployed contract: 0xe8aE6927abc7295a41b0AadE03d2B45a36243955
// last deployed contract (Kovan): 0x907079344a618EEc762E1F8255585d1b7e2b18Ec
// add safemath check in the future
// ---------------------

// TODO: add Contract address check before any action prevent sending token to address(0)

// Currently only work for SAI
contract Manager {

    struct Platform {
        string name;
        uint256 weight;
    }
    
    
    Platform[] public platforms;
    // mapping(string => Platform) public platformMapping;
    mapping(address => address) public contractAddress; // personal controller address

    address public moderator; // from Cortex AI
    // address public addressesCenterAddress = 0x41722E7CB63095852440eb64F0464aCa75278FbA;
    // AddressesCenter addressesCenter = AddressesCenter(addressesCenterAddress);

    //  ---------------
    // Developping the amount of benefit since deposit
    //  ---------------
    mapping(address => uint256) public lastDepositValue;
    
    // basic functions
    constructor() public {
        moderator = msg.sender;
        platforms.push(Platform("Compound", 579));
        platforms.push(Platform("Fulcrum", 117));
        platforms.push(Platform("Aave", 304));
    }

    modifier moderatorOnly() {
        require(msg.sender == moderator, "Moderator Only");
        _;
    }

    function addPlatform(string memory _name, uint256 _weight) public moderatorOnly  {
        platforms.push(Platform(_name, _weight));
        // platformMapping[_name] = Platform(_name, _weight);
    }

    function adjustPlatform(string memory _name, uint256 _weight) public moderatorOnly  {
        // platformMapping[_name].weight = _weight;
        for(uint8 i = 0; i < platforms.length; ++i) {
            if(keccak256(abi.encode(platforms[i].name)) == keccak256(abi.encode(_name))) {
                platforms[i].weight = _weight;
            }
        }
    }
    
    function removePlatform(string memory _name) public moderatorOnly returns(bool){
        uint256 numOfPlatform = platforms.length;
        for(uint8 i = 0; i < numOfPlatform; ++i) {
            if(keccak256(abi.encode(platforms[i].name)) == keccak256(abi.encode(_name))) {
                if(i == numOfPlatform - 1) {
                    platforms.pop();
                    return true;
                }
                platforms[i] = platforms[numOfPlatform - 1];
                platforms.pop();
                return true;
            }
        }
        revert("not found");
    }

    function transferOwnershipt(address _address) public moderatorOnly {
        moderator = _address;
    }

    function updateAddressCenter(address _address) public moderatorOnly {
        Controller(contractAddress[msg.sender]).updateAddressCenter(_address);
        // addressesCenterAddress = _address;
        // addressesCenter = AddressesCenter(addressesCenterAddress);
    }
    
    // custom log system
    mapping(string => string[]) public administrativeLogs;
    
    function getLogLength(string memory _category) public view returns(uint) {
        return administrativeLogs[_category].length;
    }
    
    function insertLog(string memory _category, string memory _log) public moderatorOnly {
        administrativeLogs[_category].push(_log);
    }

    // --- step 1: binding (from contract) ---
    function bindContract(address _contractAddr) public {
        contractAddress[msg.sender] = _contractAddr;
    }

    // --- step 2: approve ---
    // token.approve()
    function addAssetController(address _tokenAddr) public {
        Controller(contractAddress[msg.sender]).addAsset(_tokenAddr);
    }

    // --- step 3: access personal contract ---
    function getAllBalancesByAsset(address _tokenAddr) public view returns (
        uint256 _total,
        uint256 _ready
    ) {
        Controller personallController = Controller(contractAddress[msg.sender]);
        _total = personallController.getTokenTotalBalance(_tokenAddr);
        _ready = EIP(_tokenAddr).balanceOf(contractAddress[msg.sender]);
    }
    
    function getSavingTokenBalances(string memory _platform, address _tokenAddr) public view returns (
        uint256 _total
    ) {
        Controller personallController = Controller(contractAddress[msg.sender]);
        _total = personallController.getTokenCurrentBalance(_platform, _tokenAddr);
    }
    
    function getNumberOfPlatform() public view returns (uint) {
        return platforms.length;
    }
    
    function getProfitSinceLastDeposit(address _tokenAddr) public view returns(uint256) {
        Controller personallController = Controller(contractAddress[msg.sender]);
        uint256 total = personallController.getTokenTotalBalance(_tokenAddr);
        return total - lastDepositValue[_tokenAddr];
    }

    // --- asset token transfering ---
    function depositAssetToken(address _tokenAddr, uint256 _value) public returns (bool) {
        EIP token = EIP(_tokenAddr);
        require(token.transferFrom(msg.sender, contractAddress[msg.sender], _value), "transfer failed!");
        // for recording profit
        Controller personallController = Controller(contractAddress[msg.sender]);
        lastDepositValue[_tokenAddr] = personallController.getTokenTotalBalance(_tokenAddr);
        return true;
    }

    function withdrawAssetToken(address _tokenAddr, uint256 _value) public returns (bool) {
        Controller personallController = Controller(contractAddress[msg.sender]);
        personallController.withdrawTokenToManager(msg.sender, _tokenAddr, _value);
        
        // for recording profit
        lastDepositValue[_tokenAddr] = personallController.getTokenTotalBalance(_tokenAddr);
        return true;
    }
    
    function withdrawAllAvailableAssetToken(address _tokenAddr) public returns (bool){
        EIP token = EIP(_tokenAddr);
        uint256 value = token.balanceOf(contractAddress[msg.sender]);
        require(value > 0, "you cannot withdraw 0 token");
        Controller personallController = Controller(contractAddress[msg.sender]);
        personallController.withdrawTokenToManager(msg.sender, _tokenAddr, value);
        // for recording profit
        lastDepositValue[_tokenAddr] = personallController.getTokenTotalBalance(_tokenAddr);
        return true;
    }

    // --- investment ---
    // need addAsset() in the controller
    function investByWeight(address _tokenAddr, uint256 _value) public {
        uint256 totalWeight = 0;
        uint256 numOfPlatform = platforms.length;
        for(uint8 i = 0; i < numOfPlatform; ++i) {
            totalWeight += platforms[i].weight;
        }
        for(uint8 i = 0; i < numOfPlatform; ++i) {
            uint256 value = _value * platforms[i].weight / totalWeight;
            Controller(contractAddress[msg.sender]).mintToken(platforms[i].name, _tokenAddr, value);
        }
    }
    
    function investByValue(address _tokenAddr, string memory _platform, uint256 _value) public {
        Controller(contractAddress[msg.sender]).mintToken(_platform, _tokenAddr, _value);
    }
    
    function redeemAll(address _tokenAddr) public {
        uint256 numOfPlatform = platforms.length;
        for(uint8 i = 0; i < numOfPlatform; ++i) {
            Controller(contractAddress[msg.sender]).redeemAllToken(platforms[i].name, _tokenAddr);
        }
    }
    
    // --- all in one ---
    function depositAndInvestByWeight(address _tokenAddr, uint256 _value) public returns (bool) {
        EIP token = EIP(_tokenAddr);
        require(token.transferFrom(msg.sender, contractAddress[msg.sender], _value), "transfer failed!");
        investByWeight(_tokenAddr, _value);
        // for recording profit
        Controller personallController = Controller(contractAddress[msg.sender]);
        lastDepositValue[_tokenAddr] = personallController.getTokenTotalBalance(_tokenAddr);
        return true;
    }

    function redeemAndWithdrawAll(address _tokenAddr) public returns (bool){
        redeemAll(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        uint256 value = token.balanceOf(contractAddress[msg.sender]);
        require(value > 0, "you cannot withdraw 0 token");
        Controller personallController = Controller(contractAddress[msg.sender]);
        personallController.withdrawTokenToManager(msg.sender, _tokenAddr, value);
        // for recording profit
        lastDepositValue[_tokenAddr] = personallController.getTokenTotalBalance(_tokenAddr);
        return true;
    }
}