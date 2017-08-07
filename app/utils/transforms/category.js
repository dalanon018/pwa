import {
  adjust,
  curry,
  fromPairs,
  map,
  toPairs
} from 'ramda'

import {
  STRING,
  ValidateSchema
} from './helper'

const Schema = {
  categoryCode: {
    name: 'id',
    type: STRING
  },
  image: {
    name: 'image',
    type: STRING
  },
  name: {
    name: 'name',
    type: STRING
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const transformCategory = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)
  return applySchemaName
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
