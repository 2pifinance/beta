const address = '0xc3a5015D45E82adAE054b6984d40a538c1c86AA4'
const abi     = [
  {
    'type':'function',
    'stateMutability':'nonpayable',
    'outputs':[
      {
        'type':'bool',
        'name':'',
        'internalType':'bool'
      }
    ],
    'name':'approve',
    'inputs':[
      {
        'type':'address',
        'name':'spender',
        'internalType':'address'
      },
      {
        'type':'uint256',
        'name':'amount',
        'internalType':'uint256'
      }
    ]
  },
  {
    'type':'function',
    'stateMutability':'view',
    'outputs':[
      {
        'type':'uint256',
        'name':'',
        'internalType':'uint256'
      }
    ],
    'name':'allowance',
    'inputs':[
      {
        'type':'address',
        'name':'owner',
        'internalType':'address'
      },
      {
        'type':'address',
        'name':'spender',
        'internalType':'address'
      }
    ]
  },
  {
    'type':'function',
    'stateMutability':'view',
    'outputs':[
      {
        'type':'uint8',
        'name':'',
        'internalType':'uint8'
      }
    ],
    'name':'decimals',
    'inputs':[

    ]
  },
  {
    'type':'function',
    'stateMutability':'view',
    'outputs':[
      {
        'type':'uint256',
        'name':'',
        'internalType':'uint256'
      }
    ],
    'name':'balanceOf',
    'inputs':[
      {
        'type':'address',
        'name':'account',
        'internalType':'address'
      }
    ]
  }
]

const token = {abi, address}

export default token
