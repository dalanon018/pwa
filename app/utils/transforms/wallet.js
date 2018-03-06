import {
  __,
  compose,
  map,
  partial,
  evolve,
  partialRight
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

const transformWallet = async (data) => {
  // we need to clean our employee data first
  const awaitValidateSchema = await ValidateSchema

  const transform = {
    transactions: map(compose(
      updateObject(__, TransactionSchema),
      partial(awaitValidateSchema, [TransactionSchema])
    ))(__)
  }

  const transpile = await compose(
    evolve(transform),
    partialRight(updateObject, [WalletSchema])
  )

  return transpile(data)
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
