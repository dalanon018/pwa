import { isEmpty } from 'lodash'
import {
  subtract,
  multiply,
  divide,
  lt,
} from 'ramda'

/**
 * Main calculation for getting the total price
 * @param {*} price
 * @param {*} discount
 */
const getTotalPrice = ({ price, discountPrice }) => {
  return subtract(price, multiply(price, divide(discountPrice, 100)))
}

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const identifyCalculation = cases => dafultFn => key =>
 key in cases ? cases[key] : dafultFn

 /**
  * Gettting amount percentage
  * @param {*} product
  */
export const calculatePercentage = getTotalPrice

/**
  * Gettting amount amount
  * @param {*} product
  */
const calculateAmount = ({ price, discountPrice }) =>
   subtract(price, discountPrice)

/**
 * Main component for getting the price
 * @param {*} param0
 */
export const calculateDiscountPrice = ({ price, discountPrice, discountType }) => {
  if (lt(discountPrice, 0)) {
    return (parseFloat(price).toLocaleString())
  }

  return identifyCalculation({
    PERCENTAGE: calculatePercentage,
    AMOUNT: calculateAmount
  })(calculatePercentage)(discountType)({ price, discountPrice })
}
