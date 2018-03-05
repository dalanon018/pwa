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
  propEq,
  partial
} from 'ramda'

import {
  ARRAY,
  OBJECT,
  STRING,
  ValidateSchema
} from './helper'

const Schema = {
  id: {
    name: 'id',
    type: STRING
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
    type: ARRAY
  },
  fromDate: {
    name: 'fromDate',
    type: STRING
  },
  productList: {
    name: 'productList',
    type: OBJECT
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

const applyChildren = (data) => compose(
  assoc('children', __, data),
  map(adjustmentObject),
  map(partial(mapKeys, [changeKey])),
  propOr([], 'children')
)(data)

const adjustmentObject = (data) => {
  const removeKeys = ['images']
  return compose(
    omit(removeKeys),
    applyChildren,
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
