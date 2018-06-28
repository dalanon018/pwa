import {
  STRING,
  ValidateSchema,
  mapKeys
} from './helper'

const Schema = {
  PHP: {
    name: 'PHP',
    type: STRING
  },
  cliqqCode: {
    name: 'cliqqCode',
    type: STRING
  },
  multiplier: {
    name: 'multiplier',
    type: STRING
  }
}

const changeKey = (key) => Schema[key] ? Schema[key].name : null

const transform = async (data) => {
  return mapKeys(changeKey, data)
}

const Entity = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transform(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Entity
