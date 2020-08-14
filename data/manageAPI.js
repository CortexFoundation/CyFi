const jsoninterface = require('./jsoninterface.js');
var Web3 = require('web3');

// Mainnet
// const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/03fe211fc9a64c4ca614ca04e6d45c5d');
// const SAIAddress = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2';
// const SAIContract = new w3Connection.eth.Contract(jsoninterface.erc20Interface, SAIAddress);
// const cSAIAddress = '0x63c344BF8651222346DD870be254D4347c9359f7';
// const cSAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cSAIAddress);
// const iSAIAddress = '0xA1e58F3B1927743393b25f261471E1f2D3D9f0F6';
// const iSAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iSAIAddress);

// Kovan
const provider = new Web3.providers.HttpProvider('https://kovan.infura.io/v3/03fe211fc9a64c4ca614ca04e6d45c5d');
const w3Connection = new Web3(provider);


const SAIAddress = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
const SAIContract = new w3Connection.eth.Contract(jsoninterface.erc20Interface, SAIAddress);
const cSAIAddress = '0xF5DCe57282A584D2746FaF1593d3121Fcac444dC';
const cSAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cSAIAddress);
const iSAIAddress = '0x14094949152EDDBFcd073717200DA82fEd8dC960';
const iSAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iSAIAddress);

const managerContractAddress = '0x907079344a618EEc762E1F8255585d1b7e2b18Ec';
const managerContract = new w3Connection.eth.Contract(jsoninterface.managerInterface, managerContractAddress);

const historyContractAddress = '0x907079344a618EEc762E1F8255585d1b7e2b18Ec';
const historyContract = new w3Connection.eth.Contract(jsoninterface.managerInterface, managerContractAddress);



senderInfo = {
    address: '0xe2d50CFb680ffD3E39a187ae8C22B4f81b092A10',
}

// --- setup function ---
async function approveForManager(_tokenAddr) {
    let tokenContract = new w3Connection.eth.Contract(jsoninterface.erc20Interface, _tokenAddr);
    await tokenContract.methods
        .approve({
            spender: managerContractAddress,
            value: 2**256 - 1
        })
        .send({from: senderInfo.address});
}

async function bindController(_contractAddr) {
    await managerContract.methods
        .bindContract(_contractAddr)
        .send({from: senderInfo.address});
}

async function addAssetController(_tokenAddr) {
    await managerContract.methods
        .addAssetController(_tokenAddr)
        .send({from: senderInfo.address});
}

// --- moderator functions ---
async function addPlatform(_platform, _weight) {
    let res = await managerContract.methods
        .addPlatform({
            "_platform": _platform,
            "_weight": _weight
        })
        .send({from: senderInfo.address});
    return res;
}

async function adjustPlatform(_platform, _weight) {
    let res = await managerContract.methods
        .adjustPlatform({
            "_platform": _platform,
            "_weight": _weight
        })
        .send({from: senderInfo.address});
    return res;
}

async function loggerAdjustWeight(_platform, _weight) {
    let log = _platform + "'s weight adjusted to: " + _weight;
    let res = await managerContract.methods
        .insertLog({
            "_category": "weightAdjust",
            "_log": log
        })
        .send({from: senderInfo.address});
    return res;
}

async function removePlatform(_platform) {
    let res = await managerContract.methods
        .removePlatform(_platform)
        .send({from: senderInfo.address});
    return res;
}

async function transferOwnershipt(_address) {
    let res = await managerContract.methods
        .transferOwnershipt(_address)
        .send({from: senderInfo.address});
    return res;
}

async function updateAddressCenter(_address) {
    let res = await managerContract.methods
        .updateAddressCenter(_address)
        .send({from: senderInfo.address});
    return res;
}


// --- view functions ---
async function getAllBalancesByAsset(_tokenAddr) {
    let res = await managerContract.methods.getAllBalancesByAsset(_tokenAddr).call({from: senderInfo.address});
    return res;
}

async function getSavingTokenBalances(_platform, _tokenAddr) {
    let res = await managerContract.methods
        .getSavingTokenBalances({
            "_platform": _platform,
            "_tokenAddr": _tokenAddr
        })
        .call({from: senderInfo.address});
    return res;
}

// --- investment functions ---
async function depositToken(_tokenAddr, _value) {
    let res = await managerContract.methods
        .depositToken({
            "_tokenAddr": _tokenAddr,
            "_value": _value
        })
        .send({from: senderInfo.address});
    return res;
}

async function withdrawToken(_tokenAddr, _value) {
    let res = await managerContract.methods
        .withdrawToken({
            "_tokenAddr": _tokenAddr,
            "_value": _value
        })
        .send({from: senderInfo.address});
    return res;
}

async function withdrawAllAvailableToken(_tokenAddr) {
    let res = await managerContract.methods
        .withdrawAllAvailableToken(_tokenAddr)
        .send({from: senderInfo.address});
    return res;
}

async function investByWeight(_tokenAddr, _value) {
    let res = await managerContract.methods
        .investByWeight({
            "_tokenAddr": _tokenAddr,
            "_value": _value
        })
        .send({from: senderInfo.address});
    return res;
}

async function redeemAll(_tokenAddr) {
    let res = await managerContract.methods
        .redeemAll(_tokenAddr)
        .send({from: senderInfo.address});
    return res;
}

// Pulling data
async function accessBalanceOfAddress(_address) {
    let res = await managerContract.methods.
        getAllBalancesByAsset(_tokenAddr).call({from: _address});
    return res;
}


// from History.sol
async function getRecordArray() {
    let res = await historyContract.methods.
        getRecordArray().call();
    return res;
}

// update platforms weights to Manager.sol
async function batchWeightUpdate(_platforms, _weights) {
    if(_platforms.length != _weights.length) {
        console.error("Length doesn't match!");
    }
    for(let i = 0; i < _platforms.length; ++i) {
        adjustPlatform(_platforms[i], _weights[i]);
    }

}

// update history data for History.sol
async function updateHistoryToContract(_blockNum, _valueSet) {
    let res = await historyContract.methods.
        setValueDict(_blockNum, _valueSet)
        .send({from: senderInfo.address});
    return res;
}

// get data from Eth network
// format differs based on the platform
// reference from contractAPIRequest.js
iTokenContractAddress = {};
cTokenContractAddress = {};
iTokenContractAddress.iDAI = '0x14094949152EDDBFcd073717200DA82fEd8dC960';
const iDAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iTokenContractAddress.iDAI);
cTokenContractAddress.cDAI = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
const cDAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cTokenContractAddress.cDAI);
// example of getting TotalSupplyRate from Fulcrum
async function getTotalSupplyIToken (_tokenContract, _blockNumber = 'latest') {
    try{
        let res = await _tokenContract.methods
            .totalSupply()
            .call(blockNumber = _blockNumber);
        return res / 1e17;
    }
    catch(error){
        // console.error(error);
        console.error("total supply failed");
    }
    
}
async function getTotalBorrowIToken( _tokenContract, _blockNumber = 'latest' ) {
    try {
        let res = await _tokenContract.methods
            .totalBorrow()
            .call(blockNumbber = _blockNumber);
        return res / 1e17;
    }
    catch(error) {
        console.error("total borrow failed", error);
    }
}

async function updateHistory(_tokenAddr, _blockNumbber) {
    // valueSet's each value corresponding to one feature from History.sol
    // make sure the values match with the features
    let valueSet = [];
    // for Fulcrum:
    // TODO: need cast token address to itoken address
    iTokenAddress = "";
    valueSet.push(getTotalSupplyIToken(iTokenAddress));
    valueSet.push(getTotalBorrowIToken(iTokenAddress));
    // valueSet.push(borrow/supply rate);
    
    // for Compound
    valueSet = [];
    valueSet.push(getTotalSupplyCToken(cTokenAddress));
    valueSet.push(getTotalBorrowCToken(cTokenAddress));
    // valueSet.push(borrow/supply rate);

    // update the value to History.sol
    updateHistoryToContract(_blockNumbber, valueSet);
}

// require synching blockNumber with History.sol
// e.g. every 100 blockNum: blockNumber -= blockNumber % 100
// e.g. every n blockNum: blockNumber -= blockNumber % n
async function regularUpdate(_tokenAddr, _timeInSecond) {
    let time = _timeInSecond * 1000
    while(1) {
        // TODO: need to set blockNumber to specific blockNumber for each update
        let blockNumbber;

        setTimeout(updateHistory(_tokenAddr, blockNumbber), time);

    }
}


// Note: 
// _valueSet have to sync with what is defined in History.sol
async function updateHistory(_blockNum, _valueSet) {
    let res = await historyContract.methods.
        setValueDict(_blockNum, _valueSet)
        .send({from: senderInfo.address});
    return res;
}