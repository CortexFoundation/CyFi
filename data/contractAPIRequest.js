const jsoninterface = require('./jsoninterface.js');
var Web3 = require('web3');
var DBConnection;

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/03fe211fc9a64c4ca614ca04e6d45c5d');
const w3Connection = new Web3(provider);
// for testing eth network: 
// w3Connection.eth.getBlockNumber().then(console.log);
// w3Connection.eth.getBlock(9088000).then(block => {
//     console.log(block.timestamp);
// });
var DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
var DAIContract = new web3.eth.Contract(erc20Interface, DAIAddress);
const INT_MAX = 2**32 - 1;
// async function approve(_spender){
//     DAIContract.methods.approve(_spender, INT_MAX).send({from: senderInfo.address});
// }
// async function approve(_spender){
//     DAIContract.methods.allowance(senderInfo.address, _spender).call({from: senderInfo.address});
// }

async function getCurrentBlockNumber() {
    return await w3Connection.eth.getBlockNumber();
}

async function getBlockTimestamp( _blockNumber = 'latest') {
    let block = await w3Connection.eth.getBlock(_blockNumber);
    return block.timestamp;
}

// interval as number of blocks between each record (~5hours)
const INTERVAL = 1200;

// --------------------------------------------------------------------------------------------------------------
// Compound
// --------------------------------------------------------------------------------------------------------------

// https://compound.finance/developers/api#MarketHistoryService
// https://github.com/compound-finance/compound-protocol/blob/master/contracts/JumpRateModel.sol
var cTokenContractAddress = {};
cTokenContractAddress.cSAI = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
const cSAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cTokenContractAddress.cSAI);
cTokenContractAddress.cDAI = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
const cDAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cTokenContractAddress.cDAI);

// var cTokenContractAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
var cTokenContract = {}
cTokenContract.cSAI = cSAIContract;
cTokenContract.cDAI = cDAIContract;

async function getSupplyRatePerBlockCToken(_cTokenContract, _blockNumber = 'latest'){
    try{
        let res = await _cTokenContract.methods
            .supplyRatePerBlock()
            .call(blockNumber = _blockNumber);
        return (res / 1e18) * 2102400 * 100;
    }
    catch(error){
        console.error(error);
    }
    throw "Warning: Request failed: supply rate";
}

async function getBorrowRatePerBlockCToken(_cTokenContract, _blockNumber = 'latest'){
    try{
        let res = await _cTokenContract.methods
            .borrowRatePerBlock()
            .call(blockNumber = _blockNumber);
        return (res / 1e18) * 2102400 * 100;

    }
    catch(error){
        console.error(error);
    }
    throw "Warning: Request failed: borrow rate";
}

async function getTotalSupplyCToken (_cTokenContract, _blockNumber = 'latest') {
    try{
        let res = await _cTokenContract.methods
            .totalSupply()
            .call(blockNumber = _blockNumber);
        return res / 1e8;
    }
    catch(error){
        // console.error(error);
        console.error("total supply failed");
    }
    throw "Warning: Request failed: total supply";
}

async function getTotalBorrowCToken (_cTokenContract, _blockNumber = 'latest') {
    try{
        let res = await _cTokenContract.methods
            .totalBorrowsCurrent()
            .call(blockNumber = _blockNumber);
        return res / 1e18;
    }
    catch(error){
        // console.error(error);
        console.error("total borrow failed");
    }
    throw "Warning: Request failed: total borrow";
}

async function getSupplyRatePerBlockDAI(_blockNumber = 'latest'){
    try{
        let supplyRate = await cDAIContract.methods
            .supplyRatePerBlock()
            .call(blockNumber = _blockNumber);
        return supplyRate;
    }
    catch(error){
        // console.error(error);
        console.error("supply rate failed");
    }
    throw "Warning: Request failed: supply rate";
}

async function getBorrowRatePerBlockDAI(_blockNumber = 'latest'){
    try{
        let borrowRate = await cDAIContract.methods
            .borrowRatePerBlock()
            .call(blockNumber = _blockNumber);
        return borrowRate;
    }
    catch(error){
        // console.error(error);
        console.error("borrow rate failed");
    }
    throw "Warning: Request failed: borrow rate";
}

async function getTotalSupplyCDAI(_blockNumber = 'latest') {
    try{
        let res = await cDAIContract.methods
            .totalSupply()
            .call(blockNumber = _blockNumber);
        return res;
    }
    catch(error){
        // console.error(error);
        console.error("total supply failed");
    }
    throw "Warning: Request failed: total supply";
}

async function getTotalBorrowCDAI(_blockNumber = 'latest') {
    try{
        let res = await cDAIContract.methods
            .totalBorrowsCurrent()
            .call(blockNumber = _blockNumber);
        return res;
    }
    catch(error){
        // console.error(error);
        console.error("total borrow failed");
    }
    throw "Warning: Request failed: total borrow";
}

// show results

async function showCompoundResults(_cTokenSymbol, _blockNumber){
    console.log(`${_cTokenSymbol}: `);
    try{
        let contract = cTokenContract[_cTokenSymbol];
        await getSupplyRatePerBlockCToken(contract, _blockNumber).then(ret => {
            console.log('supply: ', ret)
            // console.log('supply: ', (ret / 1e18) * 2102400 * 100);
        });
        await getBorrowRatePerBlockCToken(contract, _blockNumber).then(ret => {
            console.log('borrow: ', ret)
            // console.log('borrow: ', (ret / 1e18) * 2102400 * 100);
        });
        await getTotalSupplyCToken(contract, _blockNumber).then(ret => {
            console.log('totalSupply: ', ret);
            // console.log('totalSupply: ', ret / 1e8);
        });
        await getTotalBorrowCToken(contract, _blockNumber).then(ret => {
            console.log('totalSupply: ', ret);
            // console.log('totalBorrow: ', ret / 1e18);
        });
    }
    catch(error){
        console.error(">>>>>>>>>>>>>>>>>>>>>", error);
    }
}

async function getCompoundResultsBySymbol(_cTokenSymbol, _blockNumber){
    let res = {}
    try{
        let contract = cTokenContract[_cTokenSymbol];
        res.timestamp = getBlockTimestamp(_blockNumber);
        res.supplyRate = getSupplyRatePerBlockCToken(contract, _blockNumber);
        res.borrowRate = getBorrowRatePerBlockCToken(contract, _blockNumber);
        res.totalSupply = getTotalSupplyCToken(contract, _blockNumber)
        res.totalBorrow = getTotalBorrowCToken(contract, _blockNumber)
        for (let k in res) res[k] = await res[k]
        return res;
    }
    catch(error){
        console.error(">>>>>>>>>>>>>>>>>>>>>", error);
    }
    console.log("===================================================================");
    throw "Warning: One of the request failed!";
}

async function getCompoundResults(_blockNumber){
    let res = {}
    try{
        res.timestamp = getBlockTimestamp(_blockNumber);
        res.supplyRate = getSupplyRatePerBlockDAI(_blockNumber);
        res.borrowRate = getBorrowRatePerBlockDAI(_blockNumber);
        res.totalSupply = getTotalSupplyCDAI(_blockNumber)
        res.totalBorrow = getTotalBorrowCDAI(_blockNumber)
        for (let k in res) res[k] = await res[k]
        return res;
    }
    catch(error){
        console.error(">>>>>>>>>>>>>>>>>>>>>", error);
    }
    console.log("===================================================================");
    throw "Warning: One of the request failed!";
}

// getCompoundResults(8983200);

async function saveDAIHistoryToDBCompound(_numberOfBlocks = 5, _keepGoing = false) {
    let symbol = 'cDAI';
    let address = cDAIContractAddress;
    let decimals = 1e8;
    let exponential = 1e18;
    let numberOfBlockPerYear = 365 * 24 * 60 * 4;
    let provider = "Compound";

    let blockNumber = await getCurrentBlockNumber();
    let startingBlockNumber = blockNumber - (blockNumber % INTERVAL);
    console.log(`>>Starting from block: ${startingBlockNumber} for ${symbol}`);
    let listOfBlockNumber = []
    for(let i = 0; i < _numberOfBlocks; ++i){
        listOfBlockNumber.push(startingBlockNumber - (i * INTERVAL));
    }
    for(let blockNumber of listOfBlockNumber) {
        let exist = await DBConnection.onchainTokenHistory.exists({'symbol': symbol, 'blockNumber': blockNumber});
        if(exist) {
            if(_keepGoing) continue;
            else break;
        }
        let res;
        try{
            res = await getCompoundResults(blockNumber);

        }
        catch(error){
            console.error("****requesting error: ", error);
            break;
        }
        // console.log(res);

        // record schema
        let record = new DBConnection.onchainTokenHistory({
            symbol: symbol,
            address: address,
            provider: provider,
            blockNumber: blockNumber,
            date: new Date(res.timestamp * 1000),
            timestamp: res.timestamp,
            totalSupply: (res.totalSupply / decimals),
            totalBorrow: (res.totalBorrow / exponential),
            supplyRate: ((res.supplyRate * numberOfBlockPerYear * 100) / exponential),
            borrowRate: ((res.borrowRate * numberOfBlockPerYear * 100) / exponential),
        });
        record.save(function (err, record) {
            if (err) return console.error(err);
            console.log(record);
        });
    }
    console.log(`<<<<<<<<<<<<Saving completed for  ${symbol}!`);
}

async function saveCTokenHistoryToDBCompound(_cTokenSymbol, _numberOfBlocks = 5, _keepGoing = false) {
    let symbol = _cTokenSymbol;
    let address = cTokenContractAddress[symbol];
    // let decimals = 1e8;
    // let exponential = 1e18;
    // let numberOfBlockPerYear = 365 * 24 * 60 * 4;
    let provider = "Compound";

    let blockNumber = await getCurrentBlockNumber();
    let startingBlockNumber = blockNumber - (blockNumber % INTERVAL);
    console.log(`>>Starting from block: ${startingBlockNumber} for ${symbol}`);
    let listOfBlockNumber = []
    for(let i = 0; i < _numberOfBlocks; ++i){
        listOfBlockNumber.push(startingBlockNumber - (i * INTERVAL));
    }
    for(let blockNumber of listOfBlockNumber) {
        let exist = await DBConnection.onchainTokenHistory.exists({'symbol': symbol, 'blockNumber': blockNumber});
        if(exist) {
            if(_keepGoing) continue;
            else break;
        }
        let res;
        try{
            res = await getCompoundResultsBySymbol(symbol, blockNumber);

        }
        catch(error){
            console.error("****requesting error: ", error);
            break;
        }
        // console.log(res);

        // record schema
        let record = new DBConnection.onchainTokenHistory({
            symbol: symbol,
            address: address,
            provider: provider,
            blockNumber: blockNumber,
            date: new Date(res.timestamp * 1000),
            timestamp: res.timestamp,
            totalSupply: res.totalSupply,
            totalBorrow: res.totalBorrow,
            supplyRate: res.supplyRate,
            borrowRate: res.borrowRate,
        });
        // console.log(record);
        record.save(function (err, record) {
            if (err) return console.error(err);
            console.log(record);
        });
    }
    console.log(`<<<<<<<<<<<<Saving completed for  ${symbol}!`);
}

// saveDAIHistoryToDBCompound();

// --------------------------------------------------------------------------------------------------------------
// Fulcrum
// --------------------------------------------------------------------------------------------------------------

// https://docs.bzx.network/fulcrum-integration/token-discovery
const tokenizedRegistryContractAddress = '0xD8dc30d298CCf40042991cB4B96A540d8aFFE73a';
const fulcrumTokenizedRegistryContract = new w3Connection.eth.Contract(
    jsoninterface.fulcrumTokenizedRegistryInterface, tokenizedRegistryContractAddress);
// const iDAIContractAddress = '0x14094949152EDDBFcd073717200DA82fEd8dC960';
// const iDAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iDAIContractAddress);

var iTokenContractAddress = {};
// iTokenContractAddress.iSAI = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
// const iSAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iTokenContractAddress.cSAI);
iTokenContractAddress.iDAI = '0x14094949152EDDBFcd073717200DA82fEd8dC960';
const iDAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iTokenContractAddress.iDAI);

// var cTokenContractAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
var iTokenContract = {}
iTokenContract.iDAI = iDAIContract;

async function getFulcrumTokenAddresses(){
    let tokens = await fulcrumTokenizedRegistryContract.methods
        .getTokenAddresses()
        .call();
    return tokens;
}

async function showAllITokens(){
    let ret = await getFulcrumTokenAddresses();
    for(let add of ret) {
        getFulcrumTokenByAddress(add).then(t => {
            if(t[3][0] == 'i') console.log(t);
        });
    }
}

async function getFulcrumTokenBySymbol(_symbol){
    let token = await fulcrumTokenizedRegistryContract.methods
        .getTokenBySymbol(_symbol)
        .call();
    return token;
}

async function getFulcrumTokenByAddress(_address){
    let token = await fulcrumTokenizedRegistryContract.methods
        .getTokenByAddress(_address)
        .call();
    return token;
}

async function getITokenContract(_symbol) {
    let iTokenContractAddress;
    let iTokenMetaData = await getFulcrumTokenBySymbol(_symbol);
    iTokenContractAddress = iTokenMetaData[0];
    console.log(iTokenContractAddress);
    return w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iTokenContractAddress);
}

// Dynamically

async function getSupplyInterestRateIToken(_cTokenContract, _blockNumber = 'latest'){
    try{
        let res = await _cTokenContract.methods
            .supplyInterestRate()
            .call(blockNumber = _blockNumber);
        return res / 1e18;
    }
    catch(error){
        console.error(error);
    }
    throw "Warning: Request failed: supply rate";
}

async function getBorrowInterestRateIToken(_cTokenContract, _blockNumber = 'latest'){
    try{
        let res = await _cTokenContract.methods
            .borrowInterestRate()
            .call(blockNumber = _blockNumber);
        return res / 1e18;

    }
    catch(error){
        console.error(error);
    }
    throw "Warning: Request failed: borrow rate";
}

async function getTotalSupplyIToken (_cTokenContract, _blockNumber = 'latest') {
    try{
        let res = await _cTokenContract.methods
            .totalSupply()
            .call(blockNumber = _blockNumber);
        return res / 1e17;
    }
    catch(error){
        // console.error(error);
        console.error("total supply failed");
    }
    throw "Warning: Request failed: total supply";
}

async function getTotalBorrowIToken (_cTokenContract, _blockNumber = 'latest') {
    try{
        let res = await _cTokenContract.methods
            .totalAssetBorrow()
            .call(blockNumber = _blockNumber);
        return res / 1e18;
    }
    catch(error){
        // console.error(error);
        console.error("total borrow failed");
    }
    throw "Warning: Request failed: total borrow";
}

// iDAI only
async function getIDAISupplyInterestRate(_blockNumber = 'latest') {
    try{
        let res = await iDAIContract.methods
            .supplyInterestRate()
            .call(blockNumber = _blockNumber);
        return res;
    }
    catch(error){
        // console.error(error);
        console.error("supply rate failed");
    }
    throw "Warning: Request failed: supply rate";
}

async function getIDAIBorrowInterestRate(_blockNumber = 'latest') {
    try{
        let res = await iDAIContract.methods
            .borrowInterestRate()
            .call(blockNumber = _blockNumber);
        return res;
    }
    catch(error){
        // console.error(error);
        console.error("borrow rate failed");
    }
    throw "Warning: Request failed: borrow rate";
}

async function getIDAITotalSupply(_blockNumber = 'latest') {
    try{
        let res = await iDAIContract.methods
            .totalSupply()
            .call(blockNumber = _blockNumber);
        return res;
    }
    catch(error){
        // console.error(error);
        console.error("total supply failed");
    }
    throw "Warning: Request failed: total supply";
}

async function getIDAITotalBorrow(_blockNumber = 'latest') {
    try{
        let res = await iDAIContract.methods
            .totalAssetBorrow()
            .call(blockNumber = _blockNumber);
        return res;
    }
    catch(error){
        // console.error(error);
        console.error("total borrowfailed");
    }
    throw "Warning: Request failed: total borrow";
}


// show results

// getITokenSupplyInterestRate("iDAI").then(ret => {
//     console.log(ret / 10**18);
// });
// getITokenTotalSupply("iDAI").then(ret => {
//     console.log(ret / 10**18);
// });

async function showFulcrumResults(_TokenSymbol, _blockNumber){
    console.log(`${_TokenSymbol}: `);
    try{
        let contract = iTokenContract[_TokenSymbol];
        await getSupplyInterestRateIToken(contract, _blockNumber).then(ret => {
            console.log('supply: ', ret)
            // console.log('supply: ', (ret / 1e18) * 2102400 * 100);
        });
        await getBorrowInterestRateIToken(contract, _blockNumber).then(ret => {
            console.log('borrow: ', ret)
            // console.log('borrow: ', (ret / 1e18) * 2102400 * 100);
        });
        await getTotalSupplyIToken(contract, _blockNumber).then(ret => {
            console.log('totalSupply: ', ret);
            // console.log('totalSupply: ', ret / 1e8);
        });
        await getTotalBorrowIToken(contract, _blockNumber).then(ret => {
            console.log('totalSupply: ', ret);
            // console.log('totalBorrow: ', ret / 1e18);
        });
    }
    catch(error){
        console.error(">>>>>>>>>>>>>>>>>>>>>", error);
    }
}

async function getFulcrumResults(_blockNumber){
    let res = {}
    try{
        res.timestamp = getBlockTimestamp(_blockNumber);
        res.supplyRate = getIDAISupplyInterestRate(_blockNumber)
        res.borrowRate = getIDAIBorrowInterestRate(_blockNumber)
        res.totalSupply = getIDAITotalSupply(_blockNumber)
        res.totalBorrow = getIDAITotalBorrow(_blockNumber)
        for (let k in res) res[k] = await res[k]
        return res;
    }
    catch(error){
        console.error(">>>>>>>>>>>>>>>>>>>>>", error);
    }
    console.log("===================================================================");
    throw "Warning: One of the request failed!";
}

async function getFulcrumResultsBySymbol(_TokenSymbol, _blockNumber){
    let res = {}
    try{
        let contract = iTokenContract[_TokenSymbol];
        res.timestamp = getBlockTimestamp(_blockNumber);
        res.supplyRate = getSupplyInterestRateIToken(contract, _blockNumber)
        res.borrowRate = getBorrowInterestRateIToken(contract, _blockNumber)
        res.totalSupply = getTotalSupplyIToken(contract, _blockNumber)
        res.totalBorrow = getTotalBorrowIToken(contract, _blockNumber)
        for (let k in res) res[k] = await res[k]
        return res;
    }
    catch(error){
        console.error(">>>>>>>>>>>>>>>>>>>>>", error);
    }
    console.log("===================================================================");
    throw "Warning: One of the request failed!";
}

async function saveITokenHistoryToDBFulcrum(_TokenSymbol, _numberOfBlocks = 5, _keepGoing = false) {
    let symbol = _TokenSymbol;
    let address = iTokenContractAddress[symbol];
    let provider = "Fulcrum";

    let blockNumber = await getCurrentBlockNumber();
    let startingBlockNumber = blockNumber - (blockNumber % INTERVAL);
    console.log(`>>Starting from block:${startingBlockNumber} for ${symbol}`);
    let listOfBlockNumber = []
    for(let i = 0; i < _numberOfBlocks; ++i){
        listOfBlockNumber.push(startingBlockNumber - (i * INTERVAL));
    }

    for(let blockNumber of listOfBlockNumber) {
        let exist = await DBConnection.onchainTokenHistory.exists({'symbol': symbol, 'blockNumber': blockNumber});
        if(exist) {
            if(_keepGoing) continue;
            else break;
        }
        let res;
        try{
            res = await getFulcrumResultsBySymbol(symbol, blockNumber);

        }
        catch(error){
            console.error("****requesting error: ", error);
            break;
        }
        // console.log(res);

        // record schema
        let record = new DBConnection.onchainTokenHistory({
            symbol: symbol,
            address: address,
            provider: provider,
            blockNumber: blockNumber,
            date: new Date(res.timestamp * 1000),
            timestamp: res.timestamp,
            totalSupply: res.totalSupply,
            totalBorrow: res.totalBorrow,
            supplyRate: res.supplyRate,
            borrowRate: res.borrowRate,
        });
        // console.log(record);
        record.save(function (err, record) {
            if (err) return console.error(err);
            console.log(record);
        });
    }
    console.log(`<<<<<<<<<<<<Saving completed for  ${symbol}!`)
}

async function saveDAIHistoryToDBFulcrum(_numberOfBlocks = 5, _keepGoing = false) {
    let symbol = 'iDAI';
    let address = iDAIContractAddress;
    let decimals = 1e17;
    let exponential = 1e18;
    let numberOfBlockPerYear = 365 * 24 * 60 * 4;
    let provider = "Fulcrum";

    let blockNumber = await getCurrentBlockNumber();
    let startingBlockNumber = blockNumber - (blockNumber % INTERVAL);
    console.log(`>>Starting from block:${startingBlockNumber} for ${symbol}`);
    let listOfBlockNumber = []
    for(let i = 0; i < _numberOfBlocks; ++i){
        listOfBlockNumber.push(startingBlockNumber - (i * INTERVAL));
    }

    for(let blockNumber of listOfBlockNumber) {
        let exist = await DBConnection.onchainTokenHistory.exists({'symbol': symbol, 'blockNumber': blockNumber});
        if(exist) {
            if(_keepGoing) continue;
            else break;
        }
        let res;
        try{
            res = await getFulcrumResults(blockNumber);

        }
        catch(error){
            console.error("****requesting error: ", error);
            break;
        }
        // console.log(res);

        // record schema
        let record = new DBConnection.onchainTokenHistory({
            symbol: symbol,
            address: address,
            provider: provider,
            blockNumber: blockNumber,
            date: new Date(res.timestamp * 1000),
            timestamp: res.timestamp,
            totalSupply: (res.totalSupply / decimals),
            totalBorrow: (res.totalBorrow / exponential),
            supplyRate: (res.supplyRate / exponential),
            borrowRate: (res.borrowRate / exponential),
        });
        record.save(function (err, record) {
            if (err) return console.error(err);
            console.log(record);
        });
    }
    console.log(`<<<<<<<<<<<<Saving completed for  ${symbol}!`)
}


// saveDAIHistoryToDBFulcrum();


// General functions:

function getAllAvailableTokens() {
    let allTokens = [];
    for(let token in cTokenContractAddress) {
        allTokens.push(token);
    }
    for(let token in iTokenContractAddress) {
        allTokens.push(token);
    }
    return allTokens;
}

/*
 * _numberOfBlocks(unsigned int): number of block of records from now -> past
 * _keepGoing(bool): will always reach the last block even the previous
 *  record already exists
 */
async function run(){

    DBConnection = require("./mongodbConnection");
    let _numberOfBlocks = 5;
    let _keepGoing = false;
    if(process.argv.length > 4) {
        _numberOfBlocks= process.argv[2];
        _keepGoing = process.argv[3];
        let allTokens = getAllAvailableTokens();
        console.log("Number of blocks: ", _numberOfBlocks);
        console.log("Keep going? ", _keepGoing);
        for(let i = 4; i < process.argv.length; ++i) {
            if(!allTokens.includes(process.argv[i])) {
                console.error(`${process.argv[i]} is currently not supported!`);
                continue;
            }
            if(process.argv[i][0] == 'c') {
                saveCTokenHistoryToDBCompound(process.argv[i], _numberOfBlocks, _keepGoing);
            }
            if(process.argv[i][0] == 'i') {
                saveITokenHistoryToDBFulcrum(process.argv[i], _numberOfBlocks, _keepGoing);
            }
        }
    }
    else{
        if(process.argv[2]) {    
            _numberOfBlocks= process.argv[2];
            if(process.argv[3]) {        
                _keepGoing = process.argv[3];
            }
        }
        console.log("Number of blocks: ", _numberOfBlocks);
        console.log("Keep going? ", _keepGoing);
        saveCTokenHistoryToDBCompound("cSAI", _numberOfBlocks, _keepGoing);
        saveITokenHistoryToDBFulcrum("iDAI", _numberOfBlocks, _keepGoing);

    }
}



// Main
if(process.argv[2] == "showTokens") {
    for(let token in cTokenContractAddress) {
        console.log(token, ': ', cTokenContractAddress[token]);
    }
    for(let token in iTokenContractAddress) {
        console.log(token, ': ', iTokenContractAddress[token]);
    }
}
else {
    // console.log(process.argv.length);
    run();
}

// showCompoundResults("cDAI");
// getCompoundResultsBySymbol("cDAI").then(console.log);
// saveCTokenHistoryToDBCompound("cSAI", 2000);

// showFulcrumResults("iDAI");
// getFulcrumResultsBySymbol("iDAI").then(console.log);
// saveITokenHistoryToDBFulcrum("iSAI");

// showCompoundResults().then(()=>{
//     showFulcrumResults();
// });