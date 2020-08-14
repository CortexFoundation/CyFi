const DBConnection = require("./mongodbConnection");
var axios = require('axios')

// Source: Compount
var APIs = []

// token details
APIs.push('https://api.compound.finance/api/v2/ctoken');
// token market histroy
var tokenAddress = [{symbol: "cDAI", address:'0xf5dce57282a584d2746faf1593d3121fcac444dc'}];
// Unix timestamp
var minTimeStamp = '1556747900';
var maxTimeStamp = '1559339900';
// data grouped by bucket size
var bucketSize = 10;
APIs.push('https://api.compound.finance/api/v2/market_history/graph?asset=' + tokenAddress[0]["address"] 
+ '&min_block_timestamp=' + minTimeStamp + '&max_block_timestamp=' + maxTimeStamp + '&num_buckets=' + bucketSize);

async function fetchData(urls){
//   let urls = ['https://api.compound.finance/api/v2/ctoken']
  let responses = urls.map(d => axios.get(d));
  let ret = [];
  for (let res of responses) {
    let t = await res;
    ret.push(t.data);
  }
  console.log(ret);
  return ret;
}

// Source: LoanScan
const apiKey = "mSlRZFzkKN1d0RD6I3Mlc6F2JkBMAe972IcYNBhT";

var targetTokens = ["SAI"];
// const protocols = ["CompoundV2","Dydx2", "MakerDao"];
const protocols = ["Dydx2"];
const domains = ["Borrow", "Supply"];

async function fetchDataLoadScan(urls){
  let responses = urls.map(d => axios(d, {
    headers: {
      "accept": "text/plain",
      "x-api-key": apiKey
    }    
  }));
  let ret = [];
  for (let res of responses) {
    let t = await res;
    ret.push(t.data);
  }
  console.log(ret);
  return ret;
}

async function retrieveDataFromAPIs(listOfURLs, functionName) {
    return await functionName(listOfURLs);
}

async function loadScanTokenSupplyRateHistroy(){
  for(let protocol of protocols) {
    for(let token of targetTokens) {
      // unix timestamp: 1st Dec 2019
      let startTimestamp = 1575208000;
      let endTimestamp = (new Date().getTime() / 1000).toFixed(0);
      let urls = [];
      let res;
      for(let domain of domains) {
        urls.push(`https://api.loanscan.io/v1/interest-rates/historical/${protocol}?interestRateDomain=${domain}&tokenSymbol=${token}&intervalType=Hour&startDateTimestamp=${startTimestamp}&endDateTimestamp=${endTimestamp}`);
        
      }
      try {
        res = await retrieveDataFromAPIs(urls, fetchDataLoadScan)
      } catch(error) {
        console.log(error);
      }
      
      for(let n of [0,1]){
        let t = 0;
        let arr = res[n];
        while(t < arr.length){
          while(t < arr.length && arr[t]["value"] != 0) ++t;
          if(t >= arr.length) break;
          let c = t;
          while(arr[c]["value"] == 0) ++c;
          arr.splice(t,c - t);      
        }
      }
      for(let n of [0,1]){
        let arr = res[n];
        let t = 0;
        while(t < arr.length){
          arr[t]["unixTimestamp"] = (new Date(arr[t]["date"]).getTime() / 1000).toFixed(0);
          ++t;
        }
      }

      let record = new DBConnection.TokenMarketHistroy({
        symbol: token,
        provider: protocol,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp,
        APRs: {
            borrow: res[0],
            supply: res[1]
        }
      });
      record.save(function (err, record) {
        if (err) return console.error(err);
        console.log(record);
      });
      
    };
  };
}

async function loadScanTokenMarketDetails(){
  var unixTimestamp = (new Date().getTime() / 1000).toFixed(0);
  for(let token of targetTokens) {
    let urls = [];
    let res;
    urls.push(`https://api.loanscan.io/v1/markets/${token}`);
    urls.push(`https://api.loanscan.io/v1/interest-rates?tokenFilter=${token}`)
    try {
      res = await retrieveDataFromAPIs(urls, fetchDataLoadScan)
    } catch(error) {
      console.log(error);
    }

    // remove the providers that don't have records
    let t = 0;
    let arr = res[1];
    while(t < arr.length){
      while(t < arr.length && arr[t]["borrow"].length > 0) ++t;
      if(t >= arr.length) break;
      let c = t;
      while(arr[c]["borrow"].length == 0) ++c;
      arr.splice(t,c - t);      
    }

    // save to database
    let record = new DBConnection.TokenMarketDetail({
      symbol: token,
      timestamp: unixTimestamp,
      holders: res[0]["holdersCount"],
      oustandingSupply: res[0]["outstandingSupply"],
      avgAPR: res[0]["apr"],
      APRs: res[1]
    })
    record.save(function (err, record) {
      if (err) return console.error(err);
      console.log(record);
    });

  };
}

// Main

// loadScanTokenSupplyRateHistroy();
// loadScanTokenMarketDetails()