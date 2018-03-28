
import {
  __,
  assoc,
  compose,
  concat,
  evolve,
  filter,
  find,
  head,
  map,
  omit,
  path,
  pick,
  prop,
  propEq,
  propOr,
  ifElse,
  isNil,
  toUpper,
} from 'ramda'

import { calculateDiscountPrice } from 'utils/promo'
import {
  ARRAY,
  BOOLEAN,
  OBJECT,
  STRING,
  ValidateSchema,
  mapKeys
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
  brand: {
    name: 'brand',
    type: OBJECT
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
  },
  isFeatured: {
    name: 'isFeatured',
    type: BOOLEAN
  },
  additionalDetails: {
    name: 'additionalDetails',
    type: STRING
  },
  availableQuantity: {
    name: 'quantity',
    type: STRING
  },
  uom: {
    name: 'uom',
    type: OBJECT
  },
  association: {
    name: 'association',
    type: ARRAY
  },
  points: {
    name: 'points',
    type: OBJECT
  }
}

const associationProducts = (data) => {
  // we need to insert the main item to the association
  const pickKeys = ['title', 'details', 'quantity', 'cliqqCode', 'size', 'uom']
  const pickNeeded = pick(pickKeys)
  const transformAssociation = compose(
    concat([pickNeeded(data)]),
    map(compose(
      pickNeeded,
      transformProduct,
      prop('product')
    ))
  )
  /**
   * name, longDescription, availableQuantity, cliqqCodes, uom
   */
  return evolve({
    association: transformAssociation
  }, data)
}

// Applying images
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

  const applyImageBrandLogo = compose(
    applyImageUrl('BRAND_LOGO'),
    propOr({}, 'brand')
  )

  return Object.assign({}, data, {
    image: applyImageUrl('PRIMARY')(data),
    brandLogo: applyImageBrandLogo(data),
    sliders: applyImageSliders('SLIDER')(data)
  })
}

// for now we will only return the first element of the id
const applyChangeProductId = (data) => compose(
  assoc('cliqqCode', __, data),
  map(prop('cliqqCode')),
  propOr([], 'cliqqCode')
)(data)

// Apply prices
const applyPrices = (data) => {
  const fetchPriceProperty = (key) => compose(
    find(propEq('currency', key)),
    propOr([], 'priceList')
  )(data)

  const pathAmount = compose(
    propOr(0, 'amount'),
    fetchPriceProperty
  )

  const identifyDiscountPrice = () => {
    const points = fetchPriceProperty('POINTS')
    const discount = pathAmount('DPHP')
    const identify = ifElse(
      isNil,
      () => discount,
      compose(
        calculateDiscountPrice,
        (points)=> ({
          price: getRegularPrice(),
          discountPrice: propOr(0, 'amount', points),
          discountType: compose(toUpper, prop('type'))(points)
        })
      )
    )
    return identify(points)
  }

  const getDiscountInfo = () => {
    const points = fetchPriceProperty('POINTS')
    const formatDiscountInfo = ifElse(
      isNil,
      () => null,
      evolve({
        type: toUpper
      })
    )

    return formatDiscountInfo(points)
  }

  const getRegularPrice = () => {
    return pathAmount('PHP')
  }

  return compose(
    assoc('discountInfo', getDiscountInfo()),
    assoc('discountPrice', identifyDiscountPrice()),
    assoc('price', getRegularPrice())
  )(data)
}

// we need to fetch the size
const applySize = (data) => {
  return {
    ...data,
    size: path(['uom', 'name'], data)
  }
}

/**
 * we need to implement parentCode since once the item goes
 * invalid on purchaselist we need to find a way to link them back to its
 * parent if they select the "child" item
 */
const applyParentCliqqCode = (data) => {
  const getParentCliqqCode = compose(
    head,
    prop('cliqqCode')
  )
  return {
    ...data,
    parentCliqqCode: getParentCliqqCode(data)
  }
}

const transformProduct = (data) => {
  const changeKey = (key) => Schema[key] ? Schema[key].name : null
  const applySchemaName = mapKeys(changeKey, data)

  const removeKeys = ['images', 'discount']
  const adjustmentObject = compose(
    omit(removeKeys),
    applyParentCliqqCode,
    associationProducts,
    applySize,
    applyImage,
    applyChangeProductId,
    applyPrices
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
