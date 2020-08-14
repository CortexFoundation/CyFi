const erc20Interface = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "who",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
];
exports.erc20Interface = erc20Interface;

// Compound
const cTokenJsonInterface = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x06fdde03"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x095ea7b3"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "repayAmount",
                "type": "uint256"
            }
        ],
        "name": "repayBorrow",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x0e752702"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "reserveFactorMantissa",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x173b9904"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "borrowBalanceCurrent",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x17bfdfbc"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x18160ddd"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "exchangeRateStored",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x182df0f5"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "src",
                "type": "address"
            },
            {
                "name": "dst",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x23b872dd"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "borrower",
                "type": "address"
            },
            {
                "name": "repayAmount",
                "type": "uint256"
            }
        ],
        "name": "repayBorrowBehalf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x2608f818"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pendingAdmin",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x26782247"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x313ce567"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOfUnderlying",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x3af9e669"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCash",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x3b1d21a2"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newComptroller",
                "type": "address"
            }
        ],
        "name": "_setComptroller",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x4576b5db"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalBorrows",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x47bd3718"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "comptroller",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5fe3b567"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "reduceAmount",
                "type": "uint256"
            }
        ],
        "name": "_reduceReserves",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x601a0bf1"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "initialExchangeRateMantissa",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x675d972c"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "accrualBlockNumber",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x6c540baf"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "underlying",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x6f307dc3"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x70a08231"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "totalBorrowsCurrent",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x73acee98"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "redeemAmount",
                "type": "uint256"
            }
        ],
        "name": "redeemUnderlying",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x852a12e3"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalReserves",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8f840ddd"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x95d89b41"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "borrowBalanceStored",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x95dd9193"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "mintAmount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa0712d68"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "accrueInterest",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa6afed95"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "dst",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa9059cbb"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "borrowIndex",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xaa5af0fd"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "supplyRatePerBlock",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xae9d70b0"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "liquidator",
                "type": "address"
            },
            {
                "name": "borrower",
                "type": "address"
            },
            {
                "name": "seizeTokens",
                "type": "uint256"
            }
        ],
        "name": "seize",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xb2a02ff1"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newPendingAdmin",
                "type": "address"
            }
        ],
        "name": "_setPendingAdmin",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xb71d1a0c"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "exchangeRateCurrent",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xbd6d894d"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getAccountSnapshot",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xc37f68e2"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "borrowAmount",
                "type": "uint256"
            }
        ],
        "name": "borrow",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xc5ebeaec"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "redeemTokens",
                "type": "uint256"
            }
        ],
        "name": "redeem",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xdb006a75"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xdd62ed3e"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "_acceptAdmin",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xe9c714f2"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newInterestRateModel",
                "type": "address"
            }
        ],
        "name": "_setInterestRateModel",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xf2b3abbd"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "interestRateModel",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf3fdb15a"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "borrower",
                "type": "address"
            },
            {
                "name": "repayAmount",
                "type": "uint256"
            },
            {
                "name": "cTokenCollateral",
                "type": "address"
            }
        ],
        "name": "liquidateBorrow",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xf5e3c462"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf851a440"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "borrowRatePerBlock",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf8f9da28"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newReserveFactorMantissa",
                "type": "uint256"
            }
        ],
        "name": "_setReserveFactor",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xfca7820b"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isCToken",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xfe9c44ae"
    },
    {
        "inputs": [
            {
                "name": "underlying_",
                "type": "address"
            },
            {
                "name": "comptroller_",
                "type": "address"
            },
            {
                "name": "interestRateModel_",
                "type": "address"
            },
            {
                "name": "initialExchangeRateMantissa_",
                "type": "uint256"
            },
            {
                "name": "name_",
                "type": "string"
            },
            {
                "name": "symbol_",
                "type": "string"
            },
            {
                "name": "decimals_",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "interestAccumulated",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "borrowIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "totalBorrows",
                "type": "uint256"
            }
        ],
        "name": "AccrueInterest",
        "type": "event",
        "signature": "0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "minter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "mintAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "mintTokens",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event",
        "signature": "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "redeemer",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "redeemAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "redeemTokens",
                "type": "uint256"
            }
        ],
        "name": "Redeem",
        "type": "event",
        "signature": "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "borrower",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "borrowAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "accountBorrows",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "totalBorrows",
                "type": "uint256"
            }
        ],
        "name": "Borrow",
        "type": "event",
        "signature": "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "payer",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "borrower",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "repayAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "accountBorrows",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "totalBorrows",
                "type": "uint256"
            }
        ],
        "name": "RepayBorrow",
        "type": "event",
        "signature": "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "liquidator",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "borrower",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "repayAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "cTokenCollateral",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "seizeTokens",
                "type": "uint256"
            }
        ],
        "name": "LiquidateBorrow",
        "type": "event",
        "signature": "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "oldPendingAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "newPendingAdmin",
                "type": "address"
            }
        ],
        "name": "NewPendingAdmin",
        "type": "event",
        "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "oldAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "NewAdmin",
        "type": "event",
        "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "oldComptroller",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "newComptroller",
                "type": "address"
            }
        ],
        "name": "NewComptroller",
        "type": "event",
        "signature": "0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "oldInterestRateModel",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "newInterestRateModel",
                "type": "address"
            }
        ],
        "name": "NewMarketInterestRateModel",
        "type": "event",
        "signature": "0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "oldReserveFactorMantissa",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "newReserveFactorMantissa",
                "type": "uint256"
            }
        ],
        "name": "NewReserveFactor",
        "type": "event",
        "signature": "0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "admin",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "reduceAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "newTotalReserves",
                "type": "uint256"
            }
        ],
        "name": "ReservesReduced",
        "type": "event",
        "signature": "0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "error",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "info",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "detail",
                "type": "uint256"
            }
        ],
        "name": "Failure",
        "type": "event",
        "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event",
        "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event",
        "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
    }
];
exports.cTokenJsonInterface = cTokenJsonInterface;

// Fulcrum
const fulcrumTokenizedRegistryInterface = [ 
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"owner",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "name":"tokens",
       "outputs":[ 
          { 
             "name":"token",
             "type":"address"
          },
          { 
             "name":"asset",
             "type":"address"
          },
          { 
             "name":"name",
             "type":"string"
          },
          { 
             "name":"symbol",
             "type":"string"
          },
          { 
             "name":"tokenType",
             "type":"uint256"
          },
          { 
             "name":"index",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "name":"tokenAddresses",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_newOwner",
             "type":"address"
          }
       ],
       "name":"transferOwnership",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"previousOwner",
             "type":"address"
          },
          { 
             "indexed":true,
             "name":"newOwner",
             "type":"address"
          }
       ],
       "name":"OwnershipTransferred",
       "type":"event"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_tokens",
             "type":"address[]"
          },
          { 
             "name":"_assets",
             "type":"address[]"
          },
          { 
             "name":"_names",
             "type":"string[]"
          },
          { 
             "name":"_symbols",
             "type":"string[]"
          },
          { 
             "name":"_types",
             "type":"uint256[]"
          }
       ],
       "name":"addTokens",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_tokens",
             "type":"address[]"
          }
       ],
       "name":"removeTokens",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          },
          { 
             "name":"_asset",
             "type":"address"
          },
          { 
             "name":"_name",
             "type":"string"
          },
          { 
             "name":"_symbol",
             "type":"string"
          },
          { 
             "name":"_type",
             "type":"uint256"
          }
       ],
       "name":"addToken",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          }
       ],
       "name":"removeToken",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          },
          { 
             "name":"_name",
             "type":"string"
          }
       ],
       "name":"setTokenName",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          },
          { 
             "name":"_symbol",
             "type":"string"
          }
       ],
       "name":"setTokenSymbol",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_symbol",
             "type":"string"
          }
       ],
       "name":"getTokenAddressBySymbol",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_name",
             "type":"string"
          }
       ],
       "name":"getTokenAddressByName",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          }
       ],
       "name":"getTokenByAddress",
       "outputs":[ 
          { 
             "components":[ 
                { 
                   "name":"token",
                   "type":"address"
                },
                { 
                   "name":"asset",
                   "type":"address"
                },
                { 
                   "name":"name",
                   "type":"string"
                },
                { 
                   "name":"symbol",
                   "type":"string"
                },
                { 
                   "name":"tokenType",
                   "type":"uint256"
                },
                { 
                   "name":"index",
                   "type":"uint256"
                }
             ],
             "name":"",
             "type":"tuple"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_name",
             "type":"string"
          }
       ],
       "name":"getTokenByName",
       "outputs":[ 
          { 
             "components":[ 
                { 
                   "name":"token",
                   "type":"address"
                },
                { 
                   "name":"asset",
                   "type":"address"
                },
                { 
                   "name":"name",
                   "type":"string"
                },
                { 
                   "name":"symbol",
                   "type":"string"
                },
                { 
                   "name":"tokenType",
                   "type":"uint256"
                },
                { 
                   "name":"index",
                   "type":"uint256"
                }
             ],
             "name":"",
             "type":"tuple"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_symbol",
             "type":"string"
          }
       ],
       "name":"getTokenBySymbol",
       "outputs":[ 
          { 
             "components":[ 
                { 
                   "name":"token",
                   "type":"address"
                },
                { 
                   "name":"asset",
                   "type":"address"
                },
                { 
                   "name":"name",
                   "type":"string"
                },
                { 
                   "name":"symbol",
                   "type":"string"
                },
                { 
                   "name":"tokenType",
                   "type":"uint256"
                },
                { 
                   "name":"index",
                   "type":"uint256"
                }
             ],
             "name":"",
             "type":"tuple"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"getTokenAddresses",
       "outputs":[ 
          { 
             "name":"",
             "type":"address[]"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_start",
             "type":"uint256"
          },
          { 
             "name":"_count",
             "type":"uint256"
          },
          { 
             "name":"_tokenType",
             "type":"uint256"
          }
       ],
       "name":"getTokens",
       "outputs":[ 
          { 
             "components":[ 
                { 
                   "name":"token",
                   "type":"address"
                },
                { 
                   "name":"asset",
                   "type":"address"
                },
                { 
                   "name":"name",
                   "type":"string"
                },
                { 
                   "name":"symbol",
                   "type":"string"
                },
                { 
                   "name":"tokenType",
                   "type":"uint256"
                },
                { 
                   "name":"index",
                   "type":"uint256"
                }
             ],
             "name":"tokenData",
             "type":"tuple[]"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          },
          { 
             "name":"_tokenType",
             "type":"uint256"
          }
       ],
       "name":"isTokenType",
       "outputs":[ 
          { 
             "name":"valid",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_token",
             "type":"address"
          },
          { 
             "name":"_tokenType",
             "type":"uint256"
          }
       ],
       "name":"getTokenAsset",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    }
 ];
exports.fulcrumTokenizedRegistryInterface = fulcrumTokenizedRegistryInterface;

const iTokenJsonInterface = [ 
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"name",
       "outputs":[ 
          { 
             "name":"",
             "type":"string"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_spender",
             "type":"address"
          },
          { 
             "name":"_value",
             "type":"uint256"
          }
       ],
       "name":"approve",
       "outputs":[ 
          { 
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"burntTokenReserved",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"totalSupply",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"initialPrice",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"baseRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"totalAssetBorrow",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"bytes32"
          }
       ],
       "name":"loanOrderData",
       "outputs":[ 
          { 
             "name":"loanOrderHash",
             "type":"bytes32"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"initialMarginAmount",
             "type":"uint256"
          },
          { 
             "name":"maintenanceMarginAmount",
             "type":"uint256"
          },
          { 
             "name":"maxDurationUnixTimestampSec",
             "type":"uint256"
          },
          { 
             "name":"index",
             "type":"uint256"
          },
          { 
             "name":"marginPremiumAmount",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"decimals",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint8"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"rateMultiplier",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"wethContract",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_owner",
             "type":"address"
          }
       ],
       "name":"balanceOf",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"tokenizedRegistry",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "name":"burntTokenReserveList",
       "outputs":[ 
          { 
             "name":"lender",
             "type":"address"
          },
          { 
             "name":"amount",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"loanTokenAddress",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"checkpointSupply",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"bZxVault",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"owner",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"symbol",
       "outputs":[ 
          { 
             "name":"",
             "type":"string"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"bZxOracle",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"bZxContract",
       "outputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "name":"leverageList",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"spreadMultiplier",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_owner",
             "type":"address"
          },
          { 
             "name":"_spender",
             "type":"address"
          }
       ],
       "name":"allowance",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_newOwner",
             "type":"address"
          }
       ],
       "name":"transferOwnership",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"address"
          }
       ],
       "name":"burntTokenReserveListIndex",
       "outputs":[ 
          { 
             "name":"index",
             "type":"uint256"
          },
          { 
             "name":"isSet",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "name":"loanOrderHashes",
       "outputs":[ 
          { 
             "name":"",
             "type":"bytes32"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "payable":true,
       "stateMutability":"payable",
       "type":"fallback"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"from",
             "type":"address"
          },
          { 
             "indexed":true,
             "name":"to",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"value",
             "type":"uint256"
          }
       ],
       "name":"Transfer",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"owner",
             "type":"address"
          },
          { 
             "indexed":true,
             "name":"spender",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"value",
             "type":"uint256"
          }
       ],
       "name":"Approval",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"minter",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"tokenAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"assetAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"price",
             "type":"uint256"
          }
       ],
       "name":"Mint",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"burner",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"tokenAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"assetAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"price",
             "type":"uint256"
          }
       ],
       "name":"Burn",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"borrower",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"borrowAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"interestRate",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"collateralTokenAddress",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"tradeTokenToFillAddress",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"withdrawOnOpen",
             "type":"bool"
          }
       ],
       "name":"Borrow",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"loanOrderHash",
             "type":"bytes32"
          },
          { 
             "indexed":true,
             "name":"borrower",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"closer",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"amount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"isLiquidation",
             "type":"bool"
          }
       ],
       "name":"Repay",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"claimant",
             "type":"address"
          },
          { 
             "indexed":false,
             "name":"tokenAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"assetAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"remainingTokenAmount",
             "type":"uint256"
          },
          { 
             "indexed":false,
             "name":"price",
             "type":"uint256"
          }
       ],
       "name":"Claim",
       "type":"event"
    },
    { 
       "anonymous":false,
       "inputs":[ 
          { 
             "indexed":true,
             "name":"previousOwner",
             "type":"address"
          },
          { 
             "indexed":true,
             "name":"newOwner",
             "type":"address"
          }
       ],
       "name":"OwnershipTransferred",
       "type":"event"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"receiver",
             "type":"address"
          }
       ],
       "name":"mintWithEther",
       "outputs":[ 
          { 
             "name":"mintAmount",
             "type":"uint256"
          }
       ],
       "payable":true,
       "stateMutability":"payable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"receiver",
             "type":"address"
          },
          { 
             "name":"depositAmount",
             "type":"uint256"
          }
       ],
       "name":"mint",
       "outputs":[ 
          { 
             "name":"mintAmount",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"receiver",
             "type":"address"
          },
          { 
             "name":"burnAmount",
             "type":"uint256"
          }
       ],
       "name":"burnToEther",
       "outputs":[ 
          { 
             "name":"loanAmountPaid",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"receiver",
             "type":"address"
          },
          { 
             "name":"burnAmount",
             "type":"uint256"
          }
       ],
       "name":"burn",
       "outputs":[ 
          { 
             "name":"loanAmountPaid",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"borrowAmount",
             "type":"uint256"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"initialLoanDuration",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenSent",
             "type":"uint256"
          },
          { 
             "name":"borrower",
             "type":"address"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          },
          { 
             "name":"loanDataBytes",
             "type":"bytes"
          }
       ],
       "name":"borrowTokenFromDeposit",
       "outputs":[ 
          { 
             "name":"loanOrderHash",
             "type":"bytes32"
          }
       ],
       "payable":true,
       "stateMutability":"payable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"borrowAmount",
             "type":"uint256"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"interestInitialAmount",
             "type":"uint256"
          },
          { 
             "name":"loanTokenSent",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenSent",
             "type":"uint256"
          },
          { 
             "name":"tradeTokenSent",
             "type":"uint256"
          },
          { 
             "name":"borrower",
             "type":"address"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          },
          { 
             "name":"tradeTokenAddress",
             "type":"address"
          },
          { 
             "name":"loanDataBytes",
             "type":"bytes"
          }
       ],
       "name":"borrowTokenAndUse",
       "outputs":[ 
          { 
             "name":"loanOrderHash",
             "type":"bytes32"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"depositAmount",
             "type":"uint256"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"loanTokenSent",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenSent",
             "type":"uint256"
          },
          { 
             "name":"tradeTokenSent",
             "type":"uint256"
          },
          { 
             "name":"trader",
             "type":"address"
          },
          { 
             "name":"depositTokenAddress",
             "type":"address"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          },
          { 
             "name":"tradeTokenAddress",
             "type":"address"
          },
          { 
             "name":"loanDataBytes",
             "type":"bytes"
          }
       ],
       "name":"marginTradeFromDeposit",
       "outputs":[ 
          { 
             "name":"loanOrderHash",
             "type":"bytes32"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"depositAmount",
             "type":"uint256"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"loanTokenSent",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenSent",
             "type":"uint256"
          },
          { 
             "name":"tradeTokenSent",
             "type":"uint256"
          },
          { 
             "name":"trader",
             "type":"address"
          },
          { 
             "name":"depositTokenAddress",
             "type":"address"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          },
          { 
             "name":"tradeTokenAddress",
             "type":"address"
          }
       ],
       "name":"marginTradeFromDeposit",
       "outputs":[ 
          { 
             "name":"loanOrderHash",
             "type":"bytes32"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
 
       ],
       "name":"wrapEther",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"tokenAddress",
             "type":"address"
          }
       ],
       "name":"donateAsset",
       "outputs":[ 
          { 
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_to",
             "type":"address"
          },
          { 
             "name":"_value",
             "type":"uint256"
          }
       ],
       "name":"transfer",
       "outputs":[ 
          { 
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"_from",
             "type":"address"
          },
          { 
             "name":"_to",
             "type":"address"
          },
          { 
             "name":"_value",
             "type":"uint256"
          }
       ],
       "name":"transferFrom",
       "outputs":[ 
          { 
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"tokenPrice",
       "outputs":[ 
          { 
             "name":"price",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_user",
             "type":"address"
          }
       ],
       "name":"checkpointPrice",
       "outputs":[ 
          { 
             "name":"price",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"marketLiquidity",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"borrowInterestRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"borrowAmount",
             "type":"uint256"
          }
       ],
       "name":"nextBorrowInterestRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"borrowAmount",
             "type":"uint256"
          },
          { 
             "name":"useFixedInterestModel",
             "type":"bool"
          }
       ],
       "name":"nextBorrowInterestRateWithOption",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"avgBorrowInterestRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"supplyInterestRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"supplyAmount",
             "type":"uint256"
          }
       ],
       "name":"nextSupplyInterestRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"totalAssetSupply",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"leverageAmount",
             "type":"uint256"
          }
       ],
       "name":"getMaxEscrowAmount",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
 
       ],
       "name":"getLeverageList",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256[]"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"loanOrderHash",
             "type":"bytes32"
          }
       ],
       "name":"getLoanData",
       "outputs":[ 
          { 
             "components":[ 
                { 
                   "name":"loanOrderHash",
                   "type":"bytes32"
                },
                { 
                   "name":"leverageAmount",
                   "type":"uint256"
                },
                { 
                   "name":"initialMarginAmount",
                   "type":"uint256"
                },
                { 
                   "name":"maintenanceMarginAmount",
                   "type":"uint256"
                },
                { 
                   "name":"maxDurationUnixTimestampSec",
                   "type":"uint256"
                },
                { 
                   "name":"index",
                   "type":"uint256"
                },
                { 
                   "name":"marginPremiumAmount",
                   "type":"uint256"
                },
                { 
                   "name":"collateralTokenAddress",
                   "type":"address"
                }
             ],
             "name":"",
             "type":"tuple"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"_owner",
             "type":"address"
          }
       ],
       "name":"assetBalanceOf",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"borrowAmount",
             "type":"uint256"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"initialLoanDuration",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          }
       ],
       "name":"getDepositAmountForBorrow",
       "outputs":[ 
          { 
             "name":"depositAmount",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"depositAmount",
             "type":"uint256"
          },
          { 
             "name":"leverageAmount",
             "type":"uint256"
          },
          { 
             "name":"initialLoanDuration",
             "type":"uint256"
          },
          { 
             "name":"collateralTokenAddress",
             "type":"address"
          }
       ],
       "name":"getBorrowAmountForDeposit",
       "outputs":[ 
          { 
             "name":"borrowAmount",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":true,
       "inputs":[ 
          { 
             "name":"assetSupply",
             "type":"uint256"
          }
       ],
       "name":"_supplyInterestRate",
       "outputs":[ 
          { 
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "components":[ 
                { 
                   "name":"loanTokenAddress",
                   "type":"address"
                },
                { 
                   "name":"interestTokenAddress",
                   "type":"address"
                },
                { 
                   "name":"collateralTokenAddress",
                   "type":"address"
                },
                { 
                   "name":"oracleAddress",
                   "type":"address"
                },
                { 
                   "name":"loanTokenAmount",
                   "type":"uint256"
                },
                { 
                   "name":"interestAmount",
                   "type":"uint256"
                },
                { 
                   "name":"initialMarginAmount",
                   "type":"uint256"
                },
                { 
                   "name":"maintenanceMarginAmount",
                   "type":"uint256"
                },
                { 
                   "name":"maxDurationUnixTimestampSec",
                   "type":"uint256"
                },
                { 
                   "name":"loanOrderHash",
                   "type":"bytes32"
                }
             ],
             "name":"loanOrder",
             "type":"tuple"
          },
          { 
             "components":[ 
                { 
                   "name":"trader",
                   "type":"address"
                },
                { 
                   "name":"collateralTokenAddressFilled",
                   "type":"address"
                },
                { 
                   "name":"positionTokenAddressFilled",
                   "type":"address"
                },
                { 
                   "name":"loanTokenAmountFilled",
                   "type":"uint256"
                },
                { 
                   "name":"loanTokenAmountUsed",
                   "type":"uint256"
                },
                { 
                   "name":"collateralTokenAmountFilled",
                   "type":"uint256"
                },
                { 
                   "name":"positionTokenAmountFilled",
                   "type":"uint256"
                },
                { 
                   "name":"loanStartUnixTimestampSec",
                   "type":"uint256"
                },
                { 
                   "name":"loanEndUnixTimestampSec",
                   "type":"uint256"
                },
                { 
                   "name":"active",
                   "type":"bool"
                },
                { 
                   "name":"positionId",
                   "type":"uint256"
                }
             ],
             "name":"loanPosition",
             "type":"tuple"
          },
          { 
             "name":"loanCloser",
             "type":"address"
          },
          { 
             "name":"closeAmount",
             "type":"uint256"
          },
          { 
             "name":"isLiquidation",
             "type":"bool"
          }
       ],
       "name":"closeLoanNotifier",
       "outputs":[ 
          { 
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    { 
       "constant":false,
       "inputs":[ 
          { 
             "name":"settingsTarget",
             "type":"address"
          },
          { 
             "name":"callData",
             "type":"bytes"
          }
       ],
       "name":"updateSettings",
       "outputs":[ 
 
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    }
 ];
exports.iTokenJsonInterface = iTokenJsonInterface;

const managerInterface = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"name": "addAssetController",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			}
		],
		"name": "addPlatform",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			}
		],
		"name": "adjustPlatform",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "administrativeLogs",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_contractAddr",
				"type": "address"
			}
		],
		"name": "bindContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "depositToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"name": "getAllBalancesByAsset",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ready",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "getInvestAmountForPlatformByWeight",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			}
		],
		"name": "getLogLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"name": "getProfitSinceLastDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_platform",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"name": "getSavingTokenBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_total",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_log",
				"type": "string"
			}
		],
		"name": "insertLog",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_platform",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "investByValue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "investByWeight",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastDepositValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "moderator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "platforms",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"name": "redeemAll",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "removePlatform",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "transferOwnershipt",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "updateAddressCenter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"name": "withdrawAllAvailableToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "withdrawToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
exports.managerInterface = managerInterface;

const historyInterface = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_newFeature",
				"type": "string"
			}
		],
		"name": "addFeature",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "baseBlockInterval",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "featureIndexes",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRecordArray",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRecordLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_feature",
				"type": "string"
			}
		],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numOfFeatures",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numOfRecords",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "recordArray",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_index",
				"type": "uint32"
			}
		],
		"name": "removeFeature",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_interval",
				"type": "uint256"
			}
		],
		"name": "setBaseBlockInterval",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_newNumOfRecords",
				"type": "uint32"
			}
		],
		"name": "setNumOfRecords",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_lastBlockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_interval",
				"type": "uint256"
			}
		],
		"name": "setRecentValues",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_blockNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_value",
				"type": "uint256[]"
			}
		],
		"name": "setValueDict",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_index",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_newFeature",
				"type": "string"
			}
		],
		"name": "updateCurrentFeature",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "valueDict",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
exports.historyInterface = historyInterface;