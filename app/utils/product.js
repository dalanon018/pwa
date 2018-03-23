
import {
  multiply,
  divide,
  subtract
} from 'ramda'

/**
 * helper on which of the property use for the price
 * // so we can expand this.
 * @param {*} product
 */
export const toggleOrigDiscountPrice = (product) => {
  const showPrice = product.get('discountPrice') || product.get('price')

  return showPrice ? showPrice.toLocaleString() : 0
}

export const computeTotalPointsPrice = (product) => {
  const amount = toggleOrigDiscountPrice(product)
  const multiplier = product.getIn(['points', 'multiplier'])
  return Math.ceil(multiply(amount, multiplier))
}

export const calculatePricePoints = ({
  product,
  usePoints
}) => {
  const pointsAmount = computeTotalPointsPrice(product)
  const pointsMultiplier = product.getIn(['points', 'multiplier'])
  const calculate = Math.floor(divide(
    subtract(pointsAmount, usePoints),
    pointsMultiplier
  ))
  // make sure not NAN
  return calculate || 0
}