import {
  adjust,
  compose,
  curry,
  find,
  filter,
  fromPairs,
  map,
  omit,
  toPairs,
  prop,
  propOr,
  propEq
} from 'ramda'

import {
  ARRAY,
  STRING,
  BOOLEAN,
  ValidateSchema
} from './helper'

const Schema = {
  brandCode: {
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
  isFeatured: {
    name: 'isFeatured',
    type: BOOLEAN
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const transformBrand = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)

  const applyImage = (data) => {
    const applyImageUrl = (key) => compose(
      propOr('', 'imageUrl'),
      find(propEq('imageType', key)),
      propOr({}, 'images')
    )

    const applyImageSliders = (key) => compose(
      map(prop('imageUrl')),
      filter(propEq('imageType', key)),
      propOr({}, 'images')
    )

    return Object.assign({}, data, {
      background: applyImageUrl('BACKGROUND')(data),
      sliders: applyImageSliders('SLIDER')(data)
    })
  }

  const removeKeys = ['images']
  const adjustmentObject = compose(
    omit(removeKeys),
    applyImage
  )

  return adjustmentObject(applySchemaName)
}

const Brand = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transformBrand(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Brand
