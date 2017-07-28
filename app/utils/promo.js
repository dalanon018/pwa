import { isEmpty } from 'lodash'

/**
 * Main calculation for getting the total price
 * @param {*} price
 * @param {*} discount
 */
const getTotalPrice = (price = 0, discount = 0) => {
  return price - (price * (discount / 100))
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
const calculatePercentage = (product) =>
  getTotalPrice(
    parseFloat(product.get('price')),
    parseFloat(product.getIn(['discount', 'value']))
  )

/**
  * Gettting amount amount
  * @param {*} product
  */
const calculateAmount = (product) =>
    parseFloat(product.get('price')) - parseFloat(product.getIn(['discount', 'value']))

/**
 * Main component for getting the price
 * @param {*} param0
 */
export const calculateProductPrice = (product) => {
  if (isEmpty(product.get('discount'))) {
    return (parseFloat(product.get('price')).toLocaleString())
  }

  return identifyCalculation({
    PERCENTAGE: calculatePercentage,
    AMOUNT: calculateAmount
  })(calculatePercentage)(product.getIn(['discount', 'discountType']))(product)
}
