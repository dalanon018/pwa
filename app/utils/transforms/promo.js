import {
  __,
  assoc,
  adjust,
  compose,
  curry,
  find,
  fromPairs,
  map,
  omit,
  toPairs,
  propOr,
  propEq
} from 'ramda'

import {
  ARRAY,
  STRING,
  NUMBER,
  ValidateSchema
} from './helper'

import transformProduct from './product'

const Schema = {
  id: {
    name: 'id',
    type: NUMBER
  },
  images: {
    name: 'images',
    type: ARRAY
  },
  name: {
    name: 'name',
    type: STRING
  },
  promoCode: {
    name: 'promoCode',
    type: STRING
  },
  fromDate: {
    name: 'fromDate',
    type: STRING
  },
  productList: {
    name: 'productList',
    type: ARRAY
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const changeKey = (key) => Schema[key] ? Schema[key].name : null

const applyImage = (data) => {
  const applyImageUrl = (key) => compose(
    propOr('', 'imageUrl'),
    find(propEq('imageType', key)),
    propOr({}, 'images')
  )
  return Object.assign({}, data, {
    icon: applyImageUrl('NAV_ICON')(data),
    background: applyImageUrl('BACKGROUND')(data),
    main: applyImageUrl('MAIN')(data)
  })
}

const applyProduct = async (data) => {
  const awaitTransformProduct = await transformProduct

  return compose(
    assoc('productList', __, data),
    map(awaitTransformProduct),
    propOr([], 'productList')
  )(data)
}

const adjustmentObject = (data) => {
  const removeKeys = ['images']
  return compose(
    omit(removeKeys),
    applyProduct,
    applyImage
  )(data)
}

const transformPromo = (data) => {
  const applySchemaName = mapKeys(changeKey, data)
  return adjustmentObject(applySchemaName)
}

const Promo = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transformPromo(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Promo
