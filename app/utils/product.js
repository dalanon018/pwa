
import {
  multiply,
  divide,
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

/**
 * helper on which of the property use for the price
 * // so we can expand this.
 * @param {*} product
 */
export const toggleOrigDiscountPrice = (product) => {
  const price = product.get('couponPrice') || product.get('discountPrice') || product.get('price')
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
