
import {
  __,
  assoc,
  find,
  adjust,
  curry,
  compose,
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
  BOOLEAN,
  OBJECT,
  STRING,
  ValidateSchema
  // SwitchFn
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
    name: 'priceList',
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
  gtin: {
    name: 'barcode',
    type: STRING
  },
  returnable: {
    name: 'returnable',
    type: BOOLEAN
  },
  deliveryPromiseMessage: {
    name: 'deliveryPromiseMessage',
    type: STRING
  },
  returnPolicy: {
    name: 'returnPolicy',
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
      propOr('', 'imageUrl'),
      find(propEq('imageType', key)),
      propOr({}, 'images')
    )

    return Object.assign({}, data, {
      image: applyImageUrl('PRIMARY')(data),
      brandLogo: applyImageUrl('BRAND_LOGO')(data)
    })
  }

  // for now we will only return the first element of the id
  const applyChangeProductId = (data) => compose(
      assoc('cliqqCode', __, data),
      map(prop('cliqqCode')),
      prop('cliqqCode')
  )(data)

  /**
   * We will not implement this yet
   * @param {*} data
   */
  // const applyChangeDiscount = (data) => {
  //   const { discount } = data

  //   const identifyDiscount = () => {
  //     const object = OBJECT(discount)
  //     const array = ARRAY(discount)

  //     return array ? 'array' : (object ? 'object' : null)
  //   }

  //   return Object.assign({}, data, {
  //     discount: SwitchFn({
  //       object: discount,
  //       array: discount[0] // we will get for now the first index
  //     })(null)(identifyDiscount())
  //   })
  // }

  const applyChangeDiscountPrice = (data) => compose(
    assoc('discountPrice', __, data),
    propOr(0, 'amount'),
    find(propEq('currency', 'DPHP')),
    prop('priceList')
  )(data)

  const applyChangePrice = (data) => compose(
    assoc('price', __, data),
    propOr(0, 'amount'),
    find(propEq('currency', 'PHP')),
    prop('priceList')
  )(data)

  const removeKeys = ['images', 'discount']
  const adjustmentObject = compose(
    omit(removeKeys),
    applyImage,
    applyChangeProductId,
    applyChangeDiscountPrice,
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
