import {
  __,
  adjust,
  apply,
  assoc,
  compose,
  curry,
  equals,
  evolve,
  filter,
  fromPairs,
  identity,
  ifElse,
  map,
  omit,
  partial,
  path,
  prop,
  toPairs
} from 'ramda'

import {
  ARRAY,
  BOOLEAN,
  OBJECT,
  NUMBER,
  STRING,
  ValidateSchema
} from './helper'
import modePayment from './modePayment'

const Schema = {
  trackingNumber: {
    name: 'trackingNumber',
    type: STRING
  },
  brand: {
    name: 'brand',
    type: OBJECT
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
  },
  expiryDate: {
    name: 'expiryDate',
    type: STRING
  },
  lastUpdated: {
    name: 'lastUpdated',
    type: STRING
  },
  claimDate: {
    name: 'claimDate',
    type: STRING
  },
  facilityName: {
    name: 'storeName',
    type: STRING
  },
  mobileNumber: {
    name: 'mobileNumber',
    type: STRING
  },
  sevenConnectRefNum: {
    name: 'payCode',
    type: STRING
  },
  claimCode: {
    name: 'claimCode',
    type: STRING
  },
  paymentType: {
    name: 'modePayment',
    type: STRING
  },
  returnable: {
    name: 'returnable',
    type: BOOLEAN
  },
  uom: {
    name: 'uom',
    type: OBJECT
  },
  association: {
    name: 'association',
    type: ARRAY
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

// what product object should have
const product = ['name', 'image', 'brandLogo', 'cliqqCode', 'brand']

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

const adjustModePayment = (data) => {
  const updateModePayment = (data, property) =>
      assoc('modePayment', modePayment(property), data)

  return compose(
    partial(updateModePayment, [data]),
    prop('modePayment')
  )(data)
}

const getParentCliqqCode = (data) => {
  // if cliqqcode is undefined then use its own cliqqcode
  const shouldUseItsCliqqCode = ifElse(
    equals(undefined),
    partial(path(['products', 'cliqqCode']), [data]),
    identity
  )

  return compose(
    evolve({
      parentCliqqCode: shouldUseItsCliqqCode
    }),
    assoc('parentCliqqCode', __, data),
    path(['association', 0, 'parentProduct', 'cliqqCodes', 0, 'cliqqCode'])
  )(data)
}

const transformOrder = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)
  const omitItems = [
    ...product,
    'association'
  ]

  const adjustmentObject = compose(
    omit(omitItems),
    getParentCliqqCode,
    adjustModePayment,
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
