
import {
  contains,
  divide,
  ifElse,
  multiply,
  partialRight,
  subtract
} from 'ramda'

/**
 * API response is the value  and what we use is the key
 */
export const EARN_POINTS__MAPPER = {
  COD: 'cod',
  CASH: 'cash',
  POINTS: 'poc'
}

export const USE_POINTS_IDENTIFIER = [
  'POINTS'
]

/**
 * We need to return if the amount should we calculate it from is including the usePoints or just the regular price object
 * @param {*} param0
 */
export const amountIdentifierPointsPrice = ({ orderedProduct, usePoints, modePayment }) => {
  const amountIdentifier = ifElse(
    partialRight(contains, [USE_POINTS_IDENTIFIER]),
    () => calculatePricePoints({
      product: orderedProduct,
      usePoints
    }),
    () => toggleOrigDiscountPrice(orderedProduct)
  )

  return amountIdentifier(modePayment)
}

/**
 * This will toggle what price strike through will display
 * @param {} param0
 */
export const priceStrikeThroughDisplay = ({ discountPrice, product, computedPrice, couponApplied }) => {
  return (couponApplied && (discountPrice !== computedPrice)) ? (discountPrice || product.get('price')) : product.get('price')
}

export const shouldApplyCouponPrice = (product) => {
  return (product.get('offlineProduct') === false) && product.get('couponPrice')
}
/**
 * helper on which of the property use for the price
 * // so we can expand this.
 * @param {*} product
 */
export const toggleOrigDiscountPrice = (product) => {
  const price = shouldApplyCouponPrice(product) || product.get('discountPrice') || product.get('price')
  return price || 0
}

export const computeTotalPointsPrice = (product) => {
  const amount = toggleOrigDiscountPrice(product)
  const multiplier = product.getIn(['points', 'multiplier']) || 0
  return Math.ceil(multiply(amount, multiplier))
}

export const calculatePricePoints = ({
  product,
  usePoints
}) => {
  const pointsAmount = computeTotalPointsPrice(product)
  const pointsMultiplier = product.getIn(['points', 'multiplier']) || 0
  const calculate = Math.floor(divide(
    subtract(pointsAmount, usePoints),
    pointsMultiplier
  ))
  // make sure not NAN
  return calculate || 0
}
