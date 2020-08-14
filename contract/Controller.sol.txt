pragma solidity ^0.5.0;
import "./TokenInterface.sol";
import "./SafeMath.sol";
import "./AddressesCenter.sol";
import "./AaveInterfaces.sol";

// Current testing(Kovan): 0x744904C5b00FabFF7F1CF442Ab00491c6ED1aBd6

// last deployed contract: 0x064b929Af73bb0E229ad07EFc15D8D75D0a8feb7
// last deployed contract (Kovan): 0x391444a4f060DeeFDfd6De898938748950337591

// testing on Kovan: 0x3C5e0d4255fd9E6497f0F0bE43C499483D3F0B69

// Only support Compound and Fulcrum at the moment
contract Controller {
    using SafeMath for uint256;
    uint256 INT_MAX = 2**256 - 1;
    
    address public owner;
    address public manager;
    address public addressesCenterAddress = 0x40407AeCb8C257aeE319769a496d3df3F3AcdD55;
    // addressesCenterAddress on MainEthNetwork: 0x41722E7CB63095852440eb64F0464aCa75278FbA 
    // addressesCenterAddress on Kovan: 0x45498fb8b00c29f1e19D7FfaBea7E355cdBd30fa 
    AddressesCenter addressesCenter = AddressesCenter(addressesCenterAddress);
    
    LendingPoolAddressesProvider aaveProvider;
    LendingPool aaveLendingPool;

    address[] public holdingAssets;
    modifier ownerOnly() {
        require(msg.sender == owner, "Only the contract owner is allowed to access.");
        _;
    }

    modifier auth() {
        require(msg.sender == manager || msg.sender == owner, "Only the contract owner or manager are allowed to access.");
        _;
    }

    constructor(address _manager) public {
        owner = msg.sender;
        manager = _manager;
        updateAaveAddresses();
        addAsset(addressesCenter.tokenAddr("DAI"));
        // SAI.approve(manager, INT_MAX);
    }


    // --- owner functions ---
    function transferOwnership(address _newOwner) public ownerOnly {
        owner = _newOwner;
    }
    
    function updateManager(address _newManager) public ownerOnly {
        manager = _newManager;
    }

    function withdrawRemainingToken(address _tokenAddr) public ownerOnly {
        EIP token = EIP(_tokenAddr);
        token.transfer(owner, token.balanceOf(address(this)));
    }
    
    // --- manager functions ---
    function updateAddressCenter(address _address) public auth {
        addressesCenterAddress = _address;
        addressesCenter = AddressesCenter(addressesCenterAddress);
    }
    
    function withdrawTokenToManager(address _owner, address _tokenAddr, uint256 _value) public auth {
        EIP token = EIP(_tokenAddr);
        require(token.balanceOf(address(this)) >= _value, "Insufficient Balance!");
        token.transfer(_owner, _value);
    }
    
    function updateAaveAddresses() public auth {
        aaveProvider = LendingPoolAddressesProvider(address(addressesCenter.aaveLendingPoolAddressesProviderAddr())); // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
        aaveLendingPool= LendingPool(aaveProvider.getLendingPool());
    }

    // --- basic functions ---
    function addAsset(address _tokenAddr) public auth {
        holdingAssets.push(_tokenAddr);
        EIP token = EIP(_tokenAddr);
        updateExchangeRateCompound(_tokenAddr);
        token.approve(addressesCenter.cTokenAddr(_tokenAddr), INT_MAX);
        token.approve(addressesCenter.iTokenAddr(_tokenAddr), INT_MAX);
        token.approve(aaveProvider.getLendingPoolCore(), INT_MAX);
    }

    function getTokenTotalBalance(address _tokenAddr) public view returns (uint256 total) {
        EIP token = EIP(_tokenAddr);
        total = token.balanceOf(address(this));
        total = total.add(getAvaiableTokenForRedeemCompound(_tokenAddr));
        total = total.add(getAvaiableTokenForRedeemFulcrum(_tokenAddr));
        total = total.add(getAvaiableTokenForRedeemAave(_tokenAddr));
    }

    function getTokenCurrentBalance(string memory _platform, address _tokenAddr) public view returns(uint256 _value) {
        if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Compound"))) {
            CompoundToken token = CompoundToken(addressesCenter.cTokenAddr(_tokenAddr));
            return token.balanceOf(address(this));
        }
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Fulcrum"))) {
            FulcrumToken token = FulcrumToken(addressesCenter.iTokenAddr(_tokenAddr));
            return token.balanceOf(address(this));
        }
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Aave"))) {
            AaveToken token = AaveToken(addressesCenter.aTokenAddr(_tokenAddr));
            return token.principalBalanceOf(address(this));
        }
        else {
            revert("Platform not exist");
        }
    }
    
    function mintToken(string memory _platform, address _tokenAddr, uint256 _value) public auth returns(bool) {
        // "_value" value of SAI, not cSAI
        if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Compound"))) {
            updateExchangeRateCompound(_tokenAddr);
            CompoundToken token = CompoundToken(addressesCenter.cTokenAddr(_tokenAddr));
            assert(token.mint(_value) == 0);
            return true;
        }
        // _value: SAI
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Fulcrum"))) {
            FulcrumToken token = FulcrumToken(addressesCenter.iTokenAddr(_tokenAddr));
            token.mint(address(this), _value);
            return true;
        }
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Aave"))) {
            aaveLendingPool.deposit(_tokenAddr, _value, 0);
            return true;
        }
        else {
            revert("Platform not exist");
        }
    }
    

    function redeemToken(string memory _platform, address _tokenAddr, uint256 _value) public auth returns(bool) {
        // _value: SAI
        if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Compound"))) {
            updateExchangeRateCompound(_tokenAddr);
            CompoundToken token = CompoundToken(addressesCenter.cTokenAddr(_tokenAddr));
            require(token.redeemUnderlying(_value) == 0, "something went wrong");
            return true;
        }
        // _value: iSAI, it could be greater than the amount that you have which will reduce it to 0
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Fulcrum"))) {
            FulcrumToken token = FulcrumToken(addressesCenter.iTokenAddr(_tokenAddr));
            token.burn(address(this), _value);
            return true;
        }
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Aave"))) {
            AaveToken token = AaveToken(addressesCenter.aTokenAddr(_tokenAddr));
            token.redeem(_value);
            return true;
        }
        else {
            revert("Platform not exist");
        }
    }
    
    function redeemAllToken(string memory _platform, address _tokenAddr) public auth returns(bool) {
        if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Compound"))) {
            updateExchangeRateCompound(_tokenAddr);
            CompoundToken token = CompoundToken(addressesCenter.cTokenAddr(_tokenAddr));
            uint256 value = getAvaiableTokenForRedeemCompound(_tokenAddr);
            require(token.redeemUnderlying(value) == 0, "something went wrong");
            return true;
        }
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Fulcrum"))) {
            FulcrumToken token = FulcrumToken(addressesCenter.iTokenAddr(_tokenAddr));
            uint256 value = getAvaiableTokenForRedeemFulcrum(_tokenAddr);
            token.burn(address(this), value);
            return true;
        }
        else if(keccak256(abi.encode(_platform)) == keccak256(abi.encode("Aave"))) {
            AaveToken token = AaveToken(addressesCenter.aTokenAddr(_tokenAddr));
            uint256 value = getAvaiableTokenForRedeemAave(_tokenAddr);
            token.redeem(value);
            return true;
        }
        else {
            revert("Platform not exist");
        }
    }

    //  --- Compound functions ---
    // compound exchange rate is updated before each investment actions
    uint256 public compoundExchangeRateCurrent;
    function updateExchangeRateCompound(address _tokenAddr) public {
        address cTokenAddr = addressesCenter.cTokenAddr(_tokenAddr);
        CompoundToken cToken = CompoundToken(cTokenAddr);
        compoundExchangeRateCurrent = cToken.exchangeRateCurrent();
    }
    
    function getAvaiableTokenForRedeemCompound(address _tokenAddr) public view returns (uint256) {
        address cTokenAddr = addressesCenter.cTokenAddr(_tokenAddr);
        CompoundToken cToken = CompoundToken(cTokenAddr);
        if(cToken.balanceOf(address(this)) == 0) return 0;
        return ((cToken.balanceOf(address(this)) + 1) * compoundExchangeRateCurrent) / 1e18; // reason for + 1: when redeem all, always left with 1 token
        // return (cToken.balanceOf(address(this)) * compoundExchangeRateCurrent) / 1e18;
    }


    // --- Fulcrum functions ---
    function getAvaiableTokenForRedeemFulcrum(address _tokenAddr) public view returns (uint256) {
        address iTokenAddr = addressesCenter.iTokenAddr(_tokenAddr);
        FulcrumToken token = FulcrumToken(iTokenAddr);
        return (token.balanceOf(address(this)) * token.tokenPrice()) / 1e18;
    }

    // --- Aave ---
    function getAvaiableTokenForRedeemAave(address _tokenAddr) public view returns (uint256) {
        address aTokenAddr = addressesCenter.aTokenAddr(_tokenAddr);
        AaveToken token = AaveToken(aTokenAddr);
        return token.principalBalanceOf(address(this));
    }

    // --- MakerDAO ---
}
