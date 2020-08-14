pragma solidity ^0.5.0;
import "./TokenInterface.sol";
import "./SafeMath.sol";


// require manual update from moderator
// 0x54AaB41e482dbB7e9984E87ed39a0a3f46d3DDA4
contract OasisPool {
    using SafeMath for uint256;
    // balance in this address only change with saving rate
    mapping(address => uint256) cortexOasisPoolBalance;
    address moderatorAddress;
    
    struct DepositInfo {
        mapping(address => bool) registered;
        mapping(address => uint256) balance;
        mapping(address => uint256) poolBalance;
    }
    mapping(address => DepositInfo) history;
    mapping(address => address[]) users;
    
    constructor() public {
        moderatorAddress = msg.sender;
    }
    
    modifier moderatorOnly() {
        require(msg.sender == moderatorAddress);
        _;
    }
    
    // --- moderator functions ---
    function updateBalanceForAllUsers(address _tokenAddr, uint256 _newPoolBalance) internal moderatorOnly {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        for(uint i = 0; i < users[_tokenAddr].length; ++i) {
            if(history[users[_tokenAddr][i]].poolBalance[_tokenAddr] == 0) {
                history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = currentCortexPoolBalance;
            }
            uint256 newBalance = history[users[_tokenAddr][i]].balance[_tokenAddr] * currentCortexPoolBalance / history[users[_tokenAddr][i]].poolBalance[_tokenAddr];
            history[users[_tokenAddr][i]].balance[_tokenAddr] = newBalance;
            history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = _newPoolBalance;
            
        }
    }
    
    // test only, since the balance is not acquirable through contract
    function setTrueBalance(address _tokenAddr, uint256 _value) public moderatorOnly {
        cortexOasisPoolBalance[_tokenAddr] = _value;
    }
    
    function depositIntoCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).add(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    function withdrawFromCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).sub(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    // backdoor
    function setBalanceModerator(address _addr, address _tokenAddr, uint256 _value) public moderatorOnly {
        history[_addr].balance[_tokenAddr] = _value;
        history[_addr].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
    function withdrawFromContract(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        token.transfer(msg.sender, _value);
    }
    
    // -- basic functions ---
    function getTrueBalance(address _tokenAddr) public view returns(uint256) {
        return cortexOasisPoolBalance[_tokenAddr];
    }
    
    function getPersonalBalance(address _tokenAddr) public view returns(bool registered, uint256 balance, uint256 poolBalance) {
        registered = history[msg.sender].registered[_tokenAddr];
        balance = history[msg.sender].balance[_tokenAddr];
        poolBalance = history[msg.sender].poolBalance[_tokenAddr];
    }
    
    function register(address _tokenAddr) internal {
        if(history[msg.sender].registered[_tokenAddr] == false){
            users[_tokenAddr].push(msg.sender);
            history[msg.sender].registered[_tokenAddr] = true;
        }
    }
    
    // --- investment functions ---
    function updateHistroy(address _tokenAddr) public {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        if(history[msg.sender].poolBalance[_tokenAddr] == 0) {
            history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
        }
        uint256 newBalance = history[msg.sender].balance[_tokenAddr] * currentCortexPoolBalance / history[msg.sender].poolBalance[_tokenAddr];
        history[msg.sender].balance[_tokenAddr] = newBalance;
        history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
    }
    
    function deposit(address _tokenAddr, uint256 _value) public {
        register(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(token.transferFrom(msg.sender, address(this), _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] = history[msg.sender].balance[_tokenAddr].add(_value);
    }
    
    function withdraw(address _tokenAddr, uint256 _value) public {
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(history[msg.sender].balance[_tokenAddr] >= _value, "Insufficient fund!");
        require(token.transfer(msg.sender, _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] -= _value;
    }
    
    function resetBalance(address _tokenAddr) public {
        history[msg.sender].balance[_tokenAddr] = 0;
        history[msg.sender].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
}


contract FulcrumPool {
    using SafeMath for uint256;
    // balance in this address only change with saving rate
    mapping(address => uint256) cortexOasisPoolBalance;
    address moderatorAddress;
    
    struct DepositInfo {
        mapping(address => bool) registered;
        mapping(address => uint256) balance;
        mapping(address => uint256) poolBalance;
    }
    mapping(address => DepositInfo) history;
    mapping(address => address[]) users;
    
    constructor() public {
        moderatorAddress = msg.sender;
    }
    
    modifier moderatorOnly() {
        require(msg.sender == moderatorAddress);
        _;
    }
    
    // --- moderator functions ---
    function updateBalanceForAllUsers(address _tokenAddr, uint256 _newPoolBalance) internal moderatorOnly {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        for(uint i = 0; i < users[_tokenAddr].length; ++i) {
            if(history[users[_tokenAddr][i]].poolBalance[_tokenAddr] == 0) {
                history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = currentCortexPoolBalance;
            }
            uint256 newBalance = history[users[_tokenAddr][i]].balance[_tokenAddr] * currentCortexPoolBalance / history[users[_tokenAddr][i]].poolBalance[_tokenAddr];
            history[users[_tokenAddr][i]].balance[_tokenAddr] = newBalance;
            history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = _newPoolBalance;
            
        }
    }
    
    // test only, since the balance is not acquirable through contract
    function setTrueBalance(address _tokenAddr, uint256 _value) public moderatorOnly {
        cortexOasisPoolBalance[_tokenAddr] = _value;
    }
    
    function depositIntoCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).add(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    function withdrawFromCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).sub(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    // backdoor
    function setBalanceModerator(address _addr, address _tokenAddr, uint256 _value) public moderatorOnly {
        history[_addr].balance[_tokenAddr] = _value;
        history[_addr].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
    function withdrawFromContract(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        token.transfer(msg.sender, _value);
    }
    
    // -- basic functions ---
    function getTrueBalance(address _tokenAddr) public view returns(uint256) {
        return cortexOasisPoolBalance[_tokenAddr];
    }
    
    function getPersonalBalance(address _tokenAddr) public view returns(bool registered, uint256 balance, uint256 poolBalance) {
        registered = history[msg.sender].registered[_tokenAddr];
        balance = history[msg.sender].balance[_tokenAddr];
        poolBalance = history[msg.sender].poolBalance[_tokenAddr];
    }
    
    function register(address _tokenAddr) internal {
        if(history[msg.sender].registered[_tokenAddr] == false){
            users[_tokenAddr].push(msg.sender);
            history[msg.sender].registered[_tokenAddr] = true;
        }
    }
    
    // --- investment functions ---
    function updateHistroy(address _tokenAddr) public {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        if(history[msg.sender].poolBalance[_tokenAddr] == 0) {
            history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
        }
        uint256 newBalance = history[msg.sender].balance[_tokenAddr] * currentCortexPoolBalance / history[msg.sender].poolBalance[_tokenAddr];
        history[msg.sender].balance[_tokenAddr] = newBalance;
        history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
    }
    
    function deposit(address _tokenAddr, uint256 _value) public {
        register(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(token.transferFrom(msg.sender, address(this), _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] = history[msg.sender].balance[_tokenAddr].add(_value);
    }
    
    function withdraw(address _tokenAddr, uint256 _value) public {
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(history[msg.sender].balance[_tokenAddr] >= _value, "Insufficient fund!");
        require(token.transfer(msg.sender, _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] -= _value;
    }
    
    function resetBalance(address _tokenAddr) public {
        history[msg.sender].balance[_tokenAddr] = 0;
        history[msg.sender].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
}


contract CompoundPool {
    using SafeMath for uint256;
    // balance in this address only change with saving rate
    mapping(address => uint256) cortexOasisPoolBalance;
    address moderatorAddress;
    
    struct DepositInfo {
        mapping(address => bool) registered;
        mapping(address => uint256) balance;
        mapping(address => uint256) poolBalance;
    }
    mapping(address => DepositInfo) history;
    mapping(address => address[]) users;
    
    constructor() public {
        moderatorAddress = msg.sender;
    }
    
    modifier moderatorOnly() {
        require(msg.sender == moderatorAddress);
        _;
    }
    
    // --- moderator functions ---
    function updateBalanceForAllUsers(address _tokenAddr, uint256 _newPoolBalance) internal moderatorOnly {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        for(uint i = 0; i < users[_tokenAddr].length; ++i) {
            if(history[users[_tokenAddr][i]].poolBalance[_tokenAddr] == 0) {
                history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = currentCortexPoolBalance;
            }
            uint256 newBalance = history[users[_tokenAddr][i]].balance[_tokenAddr] * currentCortexPoolBalance / history[users[_tokenAddr][i]].poolBalance[_tokenAddr];
            history[users[_tokenAddr][i]].balance[_tokenAddr] = newBalance;
            history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = _newPoolBalance;
            
        }
    }
    
    // test only, since the balance is not acquirable through contract
    function setTrueBalance(address _tokenAddr, uint256 _value) public moderatorOnly {
        cortexOasisPoolBalance[_tokenAddr] = _value;
    }
    
    function depositIntoCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).add(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    function withdrawFromCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).sub(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    // backdoor
    function setBalanceModerator(address _addr, address _tokenAddr, uint256 _value) public moderatorOnly {
        history[_addr].balance[_tokenAddr] = _value;
        history[_addr].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
    function withdrawFromContract(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        token.transfer(msg.sender, _value);
    }
    
    // -- basic functions ---
    function getTrueBalance(address _tokenAddr) public view returns(uint256) {
        return cortexOasisPoolBalance[_tokenAddr];
    }
    
    function getPersonalBalance(address _tokenAddr) public view returns(bool registered, uint256 balance, uint256 poolBalance) {
        registered = history[msg.sender].registered[_tokenAddr];
        balance = history[msg.sender].balance[_tokenAddr];
        poolBalance = history[msg.sender].poolBalance[_tokenAddr];
    }
    
    function register(address _tokenAddr) internal {
        if(history[msg.sender].registered[_tokenAddr] == false){
            users[_tokenAddr].push(msg.sender);
            history[msg.sender].registered[_tokenAddr] = true;
        }
    }
    
    // --- investment functions ---
    function updateHistroy(address _tokenAddr) public {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        if(history[msg.sender].poolBalance[_tokenAddr] == 0) {
            history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
        }
        uint256 newBalance = history[msg.sender].balance[_tokenAddr] * currentCortexPoolBalance / history[msg.sender].poolBalance[_tokenAddr];
        history[msg.sender].balance[_tokenAddr] = newBalance;
        history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
    }
    
    function deposit(address _tokenAddr, uint256 _value) public {
        register(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(token.transferFrom(msg.sender, address(this), _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] = history[msg.sender].balance[_tokenAddr].add(_value);
    }
    
    function withdraw(address _tokenAddr, uint256 _value) public {
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(history[msg.sender].balance[_tokenAddr] >= _value, "Insufficient fund!");
        require(token.transfer(msg.sender, _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] -= _value;
    }
    
    function resetBalance(address _tokenAddr) public {
        history[msg.sender].balance[_tokenAddr] = 0;
        history[msg.sender].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
}


contract dYdXPool {
    using SafeMath for uint256;
    // balance in this address only change with saving rate
    mapping(address => uint256) cortexOasisPoolBalance;
    address moderatorAddress;
    
    struct DepositInfo {
        mapping(address => bool) registered;
        mapping(address => uint256) balance;
        mapping(address => uint256) poolBalance;
    }
    mapping(address => DepositInfo) history;
    mapping(address => address[]) users;
    
    constructor() public {
        moderatorAddress = msg.sender;
    }
    
    modifier moderatorOnly() {
        require(msg.sender == moderatorAddress);
        _;
    }
    
    // --- moderator functions ---
    function updateBalanceForAllUsers(address _tokenAddr, uint256 _newPoolBalance) internal moderatorOnly {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        for(uint i = 0; i < users[_tokenAddr].length; ++i) {
            if(history[users[_tokenAddr][i]].poolBalance[_tokenAddr] == 0) {
                history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = currentCortexPoolBalance;
            }
            uint256 newBalance = history[users[_tokenAddr][i]].balance[_tokenAddr] * currentCortexPoolBalance / history[users[_tokenAddr][i]].poolBalance[_tokenAddr];
            history[users[_tokenAddr][i]].balance[_tokenAddr] = newBalance;
            history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = _newPoolBalance;
            
        }
    }
    
    // test only, since the balance is not acquirable through contract
    function setTrueBalance(address _tokenAddr, uint256 _value) public moderatorOnly {
        cortexOasisPoolBalance[_tokenAddr] = _value;
    }
    
    function depositIntoCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).add(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    function withdrawFromCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).sub(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        setTrueBalance(_tokenAddr, newPoolBalance);
    }
    
    // backdoor
    function setBalanceModerator(address _addr, address _tokenAddr, uint256 _value) public moderatorOnly {
        history[_addr].balance[_tokenAddr] = _value;
        history[_addr].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
    function withdrawFromContract(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        token.transfer(msg.sender, _value);
    }
    
    // -- basic functions ---
    function getTrueBalance(address _tokenAddr) public view returns(uint256) {
        return cortexOasisPoolBalance[_tokenAddr];
    }
    
    function getPersonalBalance(address _tokenAddr) public view returns(bool registered, uint256 balance, uint256 poolBalance) {
        registered = history[msg.sender].registered[_tokenAddr];
        balance = history[msg.sender].balance[_tokenAddr];
        poolBalance = history[msg.sender].poolBalance[_tokenAddr];
    }
    
    function register(address _tokenAddr) internal {
        if(history[msg.sender].registered[_tokenAddr] == false){
            users[_tokenAddr].push(msg.sender);
            history[msg.sender].registered[_tokenAddr] = true;
        }
    }
    
    // --- investment functions ---
    function updateHistroy(address _tokenAddr) public {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        if(history[msg.sender].poolBalance[_tokenAddr] == 0) {
            history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
        }
        uint256 newBalance = history[msg.sender].balance[_tokenAddr] * currentCortexPoolBalance / history[msg.sender].poolBalance[_tokenAddr];
        history[msg.sender].balance[_tokenAddr] = newBalance;
        history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
    }
    
    function deposit(address _tokenAddr, uint256 _value) public {
        register(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(token.transferFrom(msg.sender, address(this), _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] = history[msg.sender].balance[_tokenAddr].add(_value);
    }
    
    function withdraw(address _tokenAddr, uint256 _value) public {
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(history[msg.sender].balance[_tokenAddr] >= _value, "Insufficient fund!");
        require(token.transfer(msg.sender, _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] -= _value;
    }
    
    function resetBalance(address _tokenAddr) public {
        history[msg.sender].balance[_tokenAddr] = 0;
        history[msg.sender].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
    
}


// 
contract CompoundPoolAuto {
    using SafeMath for uint256;
    // balance in this address only change with oasis's saving rate
    address cortexOasisPoolAddress;
    address moderatorAddress;
    uint256 exponential = 1e18;
    
    struct DepositInfo {
        mapping(address => bool) registered;
        mapping(address => uint256) balance;
        mapping(address => uint256) poolBalance;
    }
    mapping(address => DepositInfo) history;
    mapping(address => address[]) users;
    
    
    constructor(address _poolAddr) public {
        moderatorAddress = msg.sender;
        cortexOasisPoolAddress = _poolAddr;
    }
    
    modifier moderatorOnly() {
        require(msg.sender == moderatorAddress);
        _;
    }
    
    // --- moderator functions ---
    function updateBalanceForAllUsers(address _tokenAddr, uint256 _newPoolBalance) internal moderatorOnly {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr);
        for(uint i = 0; i < users[_tokenAddr].length; ++i) {
            if(history[users[_tokenAddr][i]].poolBalance[_tokenAddr] == 0) {
                history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = currentCortexPoolBalance;
            }
            uint256 newBalance = history[users[_tokenAddr][i]].balance[_tokenAddr] * currentCortexPoolBalance / history[users[_tokenAddr][i]].poolBalance[_tokenAddr];
            history[users[_tokenAddr][i]].balance[_tokenAddr] = newBalance;
            history[users[_tokenAddr][i]].poolBalance[_tokenAddr] = _newPoolBalance;
            
        }
    }
    
    function depositIntoCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).add(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        require(token.transferFrom(msg.sender, cortexOasisPoolAddress, _value), "Transfer failed!");
    }
    
    function withdrawFromCortexPool(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        uint256 newPoolBalance = getTrueBalance(_tokenAddr).sub(_value);
        updateBalanceForAllUsers(_tokenAddr, newPoolBalance);
        require(token.transferFrom(cortexOasisPoolAddress, msg.sender, _value), "Transfer failed!");
    }
    
    // backdoor
    function setBalanceModerator(address _addr, address _tokenAddr, uint256 _value) public moderatorOnly {
        history[_addr].balance[_tokenAddr] = _value;
        history[_addr].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
        // history[_addr].blockNumberTracker[_tokenAddr] = changesIntoPool[_tokenAddr].length;
    }
    
    function withdrawFromContract(address _tokenAddr, uint256 _value) public moderatorOnly {
        EIP token = EIP(_tokenAddr);
        token.transfer(msg.sender, _value);
    }
    
    // -- basic functions ---
    // differs depends on platforms
    function getExchangeRate(address _tokenAddr) public returns(uint256) {
        CompoundToken token = CompoundToken(_tokenAddr);
        return token.exchangeRateCurrent();
    }
    
    function getTrueBalance(address _tokenAddr) public returns(uint256) {
        EIP token = EIP(_tokenAddr);
        uint256 balance = token.balanceOf(cortexOasisPoolAddress);
        return balance * getExchangeRate(_tokenAddr) / exponential;
    }
    
    function getPersonalBalance(address _tokenAddr) public view returns(bool registered, uint256 balance, uint256 poolBalance) {
        registered = history[msg.sender].registered[_tokenAddr];
        balance = history[msg.sender].balance[_tokenAddr];
        poolBalance = history[msg.sender].poolBalance[_tokenAddr];
    }
    
    function register(address _tokenAddr) internal {
        if(history[msg.sender].registered[_tokenAddr] == false){
            users[_tokenAddr].push(msg.sender);
            history[msg.sender].registered[_tokenAddr] = true;
        }
    }
    
    // --- investment functions ---
    function updateHistroy(address _tokenAddr) public {
        uint256 currentCortexPoolBalance = getTrueBalance(_tokenAddr); 
        if(history[msg.sender].poolBalance[_tokenAddr] == 0) {
            history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
        }
        uint256 newBalance = history[msg.sender].balance[_tokenAddr] * currentCortexPoolBalance
            / history[msg.sender].poolBalance[_tokenAddr];
        history[msg.sender].balance[_tokenAddr] = newBalance;
        history[msg.sender].poolBalance[_tokenAddr] = currentCortexPoolBalance;
    }
    
    function deposit(address _tokenAddr, uint256 _value) public {
        register(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        // Option 1: direct transfer (test only); Option 2: mint token (could be implemented in the future)
        require(token.transferFrom(msg.sender, address(this), _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] = history[msg.sender].balance[_tokenAddr].add(_value);
    }
    
    function withdraw(address _tokenAddr, uint256 _value) public {
        EIP token = EIP(_tokenAddr);
        updateHistroy(_tokenAddr);
        require(history[msg.sender].balance[_tokenAddr] >= _value, "Insufficient fund!");
        require(token.transfer(msg.sender, _value), "Transfer failed!");
        history[msg.sender].balance[_tokenAddr] = history[msg.sender].balance[_tokenAddr].sub(_value);
    }
    
    function resetBalance(address _tokenAddr) public {
        history[msg.sender].balance[_tokenAddr] = 0;
        history[msg.sender].poolBalance[_tokenAddr] = getTrueBalance(_tokenAddr);
    }
}
