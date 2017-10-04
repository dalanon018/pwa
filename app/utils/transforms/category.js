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
  STRING,
  ValidateSchema
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
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const transformCategory = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)

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
    map(partial(mapKeys, [changeKey])),
    propOr([], 'children')
  )(data)

  const removeKeys = ['images']
  const adjustmentObject = compose(
    omit(removeKeys),
    applyChildren,
    applyImage
  )

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
