import {
  assoc,
  compose,
  find,
  map,
  omit,
  propOr,
  propEq
} from 'ramda'

import {
  ARRAY,
  STRING,
  NUMBER,
  ValidateSchema,
  mapKeys
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
  thruDate: {
    name: 'thruDate',
    type: STRING
  },
  productList: {
    name: 'productList',
    type: ARRAY
  },
  totalCount: {
    name: 'totalCount',
    type: NUMBER
  }
}

const changeKey = (key) => Schema[key] ? Schema[key].name : null

const applyImage = (data) => {
  const applyImageUrl = (key) => compose(
    propOr('', 'imageUrl'),
    find(propEq('imageType', key)),
    propOr({}, 'images')
  )
  return Object.assign({}, data, {
    icon: applyImageUrl('NAV_ICON')(data),
    background: applyImageUrl('E3-BACKGROUND')(data),
    main: applyImageUrl('PRIMARY')(data)
  })
}

const applyProduct = async (data) => {
  const awaitTransformProduct = await transformProduct

  const transformer = compose(
    async (mapData) => {
      const promiseArray = await Promise.all(mapData)
      return promiseArray
    },
    map(awaitTransformProduct),
    propOr([], 'productList')
  )
  const productList = await transformer(data)
  return assoc('productList', productList, data)
}

const transformPromo = async (data) => {
  const applySchemaName = mapKeys(changeKey, data)
  const cleanObject = omit(['images'])
  const adjustmentObject = compose(
    applyProduct,
    applyImage
  )
  const transform = await adjustmentObject(applySchemaName)

  return cleanObject(transform)
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
