var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/defi_market', {useNewUrlParser: true, useUnifiedTopology: true});


// connect to mongoDB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB connected!");
});

// create Schema
var tokenMarketHistroySchema = new mongoose.Schema({
    symbol: String,
    provider: String,
    startTimestamp: Number,
    endTimestamp: Number,
    APRs: [{
        borrow: [{
            value: Number,
            date: Date,
            unixTimestamp: Number
        }],
        supply: [{
            value: Number,
            date: Date,
            unixTimestamp: Number
        }]
    }]
});
const TokenMarketHistroy = mongoose.model("TokenMarketHistroy", tokenMarketHistroySchema);
exports.TokenMarketHistroy = TokenMarketHistroy;

var tokenMarketDetailSchema = new mongoose.Schema({
    symbol: String,
    timestamp: Number,
    holders: Number,
    oustandingSupply: Number,
    avgAPR: Number,
    APRs: {
        provider: String,
        borrow: [{
            address: String,
            rate: Number
        }],
        supply: [{
            address: String,
            rate: Number
        }]
    }
})
const TokenMarketDetail = mongoose.model("TokenMarketDetails", tokenMarketDetailSchema);
exports.TokenMarketDetail = TokenMarketDetail;

var onchainTokenHistorySchema = new mongoose.Schema({
    symbol: String,
    address: String,
    provider: String,
    blockNumber: Number,
    date: Date,
    timestamp: Number,
    totalSupply: Number,
    totalBorrow: Number,
    supplyRate: Number,
    borrowRate: Number,
})
const onchainTokenHistory = mongoose.model("onchainTokenHistory", onchainTokenHistorySchema);
exports.onchainTokenHistory = onchainTokenHistory;


