import {
  __,
  assoc,
  compose,
  find,
  map,
  omit,
  propOr,
  propEq,
  partial
} from 'ramda'

import {
  ARRAY,
  STRING,
  BOOLEAN,
  ValidateSchema,
  mapKeys
} from './helper'

const Schema = {
  categoryCode: {
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
  children: {
    name: 'children',
    type: ARRAY
  },
  isFeatured: {
    name: 'isFeatured',
    type: BOOLEAN
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

const transformCategory = (data) => {
  const applySchemaName = mapKeys(changeKey, data)
  return adjustmentObject(applySchemaName)
}

const Category = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transformCategory(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Category
