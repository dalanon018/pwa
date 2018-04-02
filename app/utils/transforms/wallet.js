import {
  assoc,
  compose,
  map,
  partial,
  propOr
} from 'ramda'

import {
  ARRAY,
  STRING,
  ValidateSchema,
  OBJECT,
  mapKeys
} from './helper'

const TransactionSchema = {
  product: {
    name: 'product',
    type: OBJECT
  },
  datetime: {
    name: 'datetime',
    type: STRING
  },
  points: {
    name: 'points',
    type: STRING
  },
  type: {
    name: 'type',
    type: STRING
  }
}

const WalletSchema = {
  currentPoints: {
    name: 'currentPoints',
    type: STRING
  },
  transactions: {
    name: 'transactions',
    type: ARRAY
  }
}

const updateObject = (data, schema) => {
  const changeKey = (key) => schema[key].name
  return mapKeys(changeKey, data)
}

const applyTransactions = async (data) => {
  // we need to clean our employee data first
  const awaitValidateSchema = await ValidateSchema

  const transformer = compose(
    async (mapData) => {
      const promiseArray = await Promise.all(mapData)
      return promiseArray
    },
    map(partial(awaitValidateSchema, [TransactionSchema]))
  )
  const transactions = await transformer(data)
  return transactions
}

const transformWallet = async (data) => {
  const applySchemaName = updateObject(data, WalletSchema)

  const transform = await compose(
    applyTransactions,
    propOr([], 'transactions')
  )

  const transactions = await transform(applySchemaName)
  return assoc('transactions', transactions, data)
}

const Wallet = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(WalletSchema, response)
    return transformWallet(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Wallet
