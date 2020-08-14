const jsoninterface = require('./jsoninterface.js');
var Web3 = require('web3');
// const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/03fe211fc9a64c4ca614ca04e6d45c5d');
const provider = new Web3.providers.HttpProvider('https://kovan.infura.io/v3/03fe211fc9a64c4ca614ca04e6d45c5d');
const w3Connection = new Web3(provider);

// Mainnet
// const DAIAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
// const tokenizedRegistryContractAddress = '0xD8dc30d298CCf40042991cB4B96A540d8aFFE73a';
// const fulcrumTokenizedRegistryContract = new w3Connection.eth.Contract(
//     jsoninterface.fulcrumTokenizedRegistryInterface, tokenizedRegistryContractAddress);


// const cDAIAddress = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
// const cDAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cDAIAddress);
// const iDAIAddress = '0xA1e58F3B1927743393b25f261471E1f2D3D9f0F6';
// const iDAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iDAIAddress);


// Kovan
const SAIAddress = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2';
const tokenizedRegistryContractAddress = '0xF1C87dD61BF8a4e21978487e2705D52AA687F97E';
const fulcrumTokenizedRegistryContract = new w3Connection.eth.Contract(
    jsoninterface.fulcrumTokenizedRegistryInterface, tokenizedRegistryContractAddress);
const iSAIAddress = '0xA1e58F3B1927743393b25f261471E1f2D3D9f0F6';
const iSAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iSAIAddress);
const cSAIAddress = '0x63c344BF8651222346DD870be254D4347c9359f7';
const cSAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cSAIAddress);

const DAIAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
const iDAIAddress = '0x6c1e2b0f67e00c06c8e2be7dc681ab785163ff4d';
const iDAIContract = new w3Connection.eth.Contract(jsoninterface.iTokenJsonInterface, iDAIAddress);
const cDAIAddress = '0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad';
const cDAIContract = new w3Connection.eth.Contract(jsoninterface.cTokenJsonInterface, cDAIAddress);

// getFulcrumTokenAddresses().then(res => {
//     for(let i = 0; i < res.length; ++i){
//         getFulcrumTokenByAddress(res[i]).then(console.log);
//     }
// });

getFulcrumTokenByAddress(iSAIAddress).then(console.log);
// --- Fulcrum ---
async function getFulcrumTokenBySymbol(_symbol){
    let token = await fulcrumTokenizedRegistryContract.methods
        .getTokenBySymbol(_symbol)
        .call();
    return token;
}

async function getFulcrumTokenAddresses(){
    let addresses = await fulcrumTokenizedRegistryContract.methods
        .getTokenAddresses()
        .call();
    return addresses;
}

async function getFulcrumTokenByAddress(_address){
    let token = await fulcrumTokenizedRegistryContract.methods
        .getTokenByAddress(_address)
        .call();
    return token;
}


async function getITokenAddress(_symbol) {
    let token = await getFulcrumTokenBySymbol(_symbol);
    console.log(token);
}

async function showITokenDetails() {
    let addresses = await getFulcrumTokenAddresses();
    for(let address of addresses) {
        getFulcrumTokenByAddress(address).then(res => {
            if(res[3][0] == 'i') {
                console.log(res);
            }
        })
        .catch();
    }
}

async function test() {
    let res = await iSAIContract.methods
        .tokenPrice()
        .call();
    return res /10**18;
}

// showITokenDetails();
// getITokenAddress("iDAI_v2");
// test().then(console.log);

// --- Compound ---
async function compoundUnderlyingToken(_contract) {
    let res = await _contract.methods
        .underlying()
        .call();
    return res;
}

async function exchangeRateCompound() {
    let res = await cSAIContract.methods
        .exchangeRateCurrent()
        .call();
    return res / 10**18;
}

async function getDec() {
    let res = await cSAIContract.methods
        .decimals()
        .call();
    return res;
}

// test().then(ret => {
//     console.log("exchange rate: ", ret);
//     test2().then(ret2 => {
//         console.log("balance: ", ret2);
//         console.log("multiply: ", ret * ret2 / 10**18);
//     });
// });
// console.log(fulcrumTokenizedRegistryContract);
// compoundUnderlyingToken(cDAIContract).then(console.log)
