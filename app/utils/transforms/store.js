import {
  adjust,
  curry,
  ifElse,
  fromPairs,
  map,
  toPairs,
  identity
} from 'ramda'

import {
  STRING,
  ValidateSchema,
  PropertiesExists,
  EmptyObject
} from './helper'

const Schema = {
  storeId: {
    name: 'id',
    type: STRING
  },
  storeName: {
    name: 'name',
    type: STRING
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const transformStore = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)

  const adjustmentObject = ifElse(
    PropertiesExists(['id', 'name']),
    identity,
    EmptyObject
  )

  return adjustmentObject(applySchemaName)
}

const Store = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transformStore(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Store
