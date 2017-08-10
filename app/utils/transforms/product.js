
import {
  find,
  adjust,
  curry,
  compose,
  fromPairs,
  map,
  omit,
  toPairs,
  prop,
  propEq
} from 'ramda'

import {
  ARRAY,
  OBJECT,
  STRING,
  ValidateSchema,
  SwitchFn
} from './helper'

const Schema = {
  cliqqCodes: {
    name: 'cliqqCode',
    type: ARRAY
  },
  imageUrl: {
    name: 'image',
    type: STRING
  },
  images: {
    name: 'images',
    type: ARRAY
  },
  brandLogo: {
    name: 'brandLogo',
    type: STRING
  },
  name: {
    name: 'title',
    type: STRING
  },
  priceList: {
    name: 'price',
    type: ARRAY
  },
  discountList: {
    name: 'discount',
    type: OBJECT
  },
  longDescription: {
    name: 'details',
    type: STRING
  },
  deliveryPromiseMessage: {
    name: 'shipping',
    type: STRING
  },
  gtin: {
    name: 'barcode',
    type: STRING
  }
}

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj)))
)

const transformProduct = (data) => {
  const changeKey = (key) => Schema[key].name
  const applySchemaName = mapKeys(changeKey, data)

  const applyImage = (data) => {
    const applyImageUrl = (key) => compose(
      prop('imageUrl'),
      find(propEq('imageType', key)),
      prop('images')
    )

    return Object.assign({}, data, {
      image: applyImageUrl('Primary')(data),
      brandLogo: applyImageUrl('BrandLogo')(data)
    })
  }

  // for now we will only return the first element of the id
  const applyChangeProductId = (data) => {
    const getCliqqCode = compose(
      map(prop('cliqqCode'))
    )(data.cliqqCode)

    return Object.assign({}, data, {
      cliqqCode: getCliqqCode
    })
  }

  const applyChangeDiscount = (data) => {
    const { discount } = data

    const identifyDiscount = () => {
      const object = OBJECT(discount)
      const array = ARRAY(discount)

      return array ? 'array' : (object ? 'object' : null)
    }

    return Object.assign({}, data, {
      discount: SwitchFn({
        object: discount,
        array: discount[0] // we will get for now the first index
      })(null)(identifyDiscount())
    })
  }
  const applyChangePrice = (data) => {
    const amount = compose(
      prop('amount'),
      find(propEq('currency', 'PHP')),
      prop('price')
    )

    return Object.assign({}, data, {
      price: amount(data) || 0
    })
  }

  const removeKeys = ['images']
  const adjustmentObject = compose(
    omit(removeKeys),
    applyImage,
    applyChangeProductId,
    applyChangeDiscount,
    applyChangePrice
  )

  return adjustmentObject(applySchemaName)
}

const Product = async (response) => {
  try {
    const cleanResponse = await ValidateSchema(Schema, response)
    return transformProduct(cleanResponse)
  } catch (err) {
    throw err
  }
}

export default Product
