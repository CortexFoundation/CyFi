pragma solidity ^0.5.0;


contract History {
    uint32 public numOfFeatures = 0;
    uint32 public numOfRecords = 2;
    uint256 public baseBlockInterval = 10;
    
    uint8 digValue = 64;
    uint8 digInt = 32;
    uint8 digFloat = 32;
    uint256 exponential = 1e18;
    
    
    mapping(uint32 => string) public featureIndexes;
    mapping(uint => mapping(string => uint256)) public valueDict;
    uint256[] public recordArray; // for exporting all records
    
    
    constructor() public {
        numOfFeatures = 2;
        featureIndexes[0] = "s";
        featureIndexes[1] = "d";
        
        // numOfFeatures = 4;
        // featureIndexes[0] = "totalSupply";
        // featureIndexes[1] = "totalBorrow";
        // featureIndexes[2] = "supplyRate";
        // featureIndexes[3] = "borrowRate";
        
        recordArray = new uint256[](numOfFeatures * numOfRecords);
    }
    
    
    function getRecordLength() public view returns(uint) {
        return recordArray.length;
    }
    
    
    function getValue(uint _blockNumber, string memory _feature) public view returns(uint256) {
        if (valueDict[_blockNumber][_feature] != 0) {
            return valueDict[_blockNumber][_feature];
        }
        return 0xffffffff;
    }
    

    function addFeature(string memory _newFeature) public {
        featureIndexes[numOfFeatures] = _newFeature;
        ++numOfFeatures;
        recordArray = new uint256[](numOfFeatures * numOfRecords);
    }
    
    
    function updateCurrentFeature(uint32 _index, string memory _newFeature) public {
        require(_index < numOfFeatures, "invalid index!");
        featureIndexes[_index] = _newFeature;
    }
    
    
    function removeFeature(uint32 _index) public {
        require(_index < numOfFeatures, "Invalid index!");
        --numOfFeatures;
        if(_index != numOfFeatures) {
            featureIndexes[_index] = featureIndexes[numOfFeatures];
        }
        featureIndexes[numOfFeatures] = "";
        recordArray = new uint256[](numOfFeatures * numOfRecords);
    }
    

    function setNumOfRecords(uint32 _newNumOfRecords) public {
        numOfRecords = _newNumOfRecords;
        recordArray = new uint256[](numOfFeatures * numOfRecords);
    }
    
    
    function setBaseBlockInterval(uint256 _interval) public {
        baseBlockInterval = _interval;
    }
    
    function setValueDict(uint _blockNum, uint256[] memory _value) public {
        for(uint32 i = 0; i < numOfFeatures; ++i) {
            valueDict[_blockNum][featureIndexes[i]] = _value[i];
        }
    }
    
    
    function setRecentValues(uint _lastBlockNumber, uint _interval) public returns(uint256[] memory) {
        require(_interval >= baseBlockInterval, "Input interval has to be greater than base interval!");
        _interval = _interval - _interval %  baseBlockInterval;
        _lastBlockNumber = _lastBlockNumber - _lastBlockNumber % baseBlockInterval;
        for(uint32 j = 0; j < numOfFeatures; ++j) {
            uint256 lastValue = 0;
            lastValue = getValue(_lastBlockNumber, featureIndexes[j]);
            for(uint32 i = 0; i < numOfRecords; ++i) {
                uint256 tempValue = getValue(_lastBlockNumber - (_interval * i), featureIndexes[j]);
                if (tempValue != 0xffffffff) {
                    lastValue = tempValue;
                }
                recordArray[j * numOfRecords + i] = lastValue;
            }
        }
        return recordArray;
    }
    
    
    function getRecordArray() public view returns(uint256[] memory) {
        return recordArray;
    }
    
}