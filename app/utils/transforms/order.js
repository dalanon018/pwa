import {
  adjust,
  apply,
  compose,
  curry,
  filter,
  fromPairs,
  map,
  omit,
  toPairs
} from 'ramda'

import {
  NUMBER,
  STRING,
  ValidateSchema
} from './helper'

const Schema = {
  trackingNumber: {
    name: 'trackingNumber',
    type: STRING
  },
  imageUrl: {
    name: 'image',
    type: STRING
  },
  brandLogo: {
    name: 'brandLogo',
    type: STRING
  },
  amount: {
    name: 'amount',
    type: NUMBER
  },
  name: {
    name: 'name',
    type: STRING
  },
  status: {
    name: 'status',
    type: STRING
  },
  cliqqCode: {
    name: 'cliqqCode',
    type: STRING
  },
  dateCreated: {
    name: 'dateCreated',
    type: STRING
  },
  claimExpiry: {
    name: 'claimExpiry',
    type: STRING
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const transformOrder = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)
  // what product object should have
  const product = ['name', 'image', 'brandLogo', 'cliqqCode']

  const addProductObject = (data) => {
    const shouldBeIncluded = (key) => product.includes(key)
    const filterWithKeys = (predicate, obj) => compose(
      fromPairs,
      filter(apply(predicate)),
      toPairs
    )(obj)

    return Object.assign({}, data, {
      products: filterWithKeys(shouldBeIncluded, data)
    })
  }

  const adjustmentObject = compose(
    omit(product),
    addProductObject
  )

  return adjustmentObject(applySchemaName)
}

const Product = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transformOrder(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Product
