import { omit } from 'lodash'
import { all, equals, isNil, map, compose, curry, complement, prop } from 'ramda'

/**
 * Helper to check the data type so we know we are accepting what we accept
 * @param {*} en
 */
export const ARRAY = (en) => Array.isArray(en)
export const OBJECT = (en) => typeof en === 'object'
export const BOOLEAN = (en) => typeof en === 'boolean'
export const STRING = (en) => typeof en === 'string'
export const NUMBER = (en) => typeof en === 'number'
export const NULL = (en) => typeof en === 'object'

/**
 * Validate our schema
 * @param {*} schema
 * @param {*} response
 */
export const ValidateSchema = (schema, response) => {
  return new Promise((resolve, reject) => {
     // first we need to omit things that not inluded on our schma
    const ommited = Object.keys(response).filter((resp) => !schema[resp])
    const finalResponse = omit(response, ommited)

    Object.keys(finalResponse).forEach((resp) => {
      if (!schema[resp].type(finalResponse[resp])) {
        reject(new Error(`${resp} key is not a valid ${schema[resp].type.name}`))
      }
    })

    resolve(finalResponse)
  })
}

/**
 * main switchFn
 * @param {*} cases
 */
export const SwitchFn = cases => defaultCase => key =>
 key in cases ? cases[key] : defaultCase

/**
 * function that will simply check if properties Exist
 */
export const PropertiesExists = curry((props, data) => compose(
    compose(all, equals(true)),
    map((property) => compose(complement(isNil), prop(property))(data))
  )(props)
)

/**
 * Empty
 */
export const EmptyObject = () => {}
export const EmptyArray = () => []
