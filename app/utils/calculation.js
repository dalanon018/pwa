import {
  compose,
  divide,
  ifElse,
  multiply,
  prop,
  propEq
} from 'ramda'

/**
 * we should round off the values e.g 2.04 = 2
 * @param {*} param0
 */
export const calculateEarnPoints = ({ method, multiplier, amount }) => {
  const calculateEarn = compose(
    Math.floor,
    computationEarnPointsRaw
  )

  return calculateEarn({ method, multiplier, amount })
}

/**
 * we have to submit the raw value to API 2.04 = 2.04
 * @param {*} param0
 */
export const computationEarnPointsRaw = ({ method, multiplier, amount }) => {
  const calculateRaw = ifElse(
    propEq('type', 'percentage'),
    compose(
      multiply(multiplier),
      multiply(amount),
      prop('value')
    ),
    prop('value')
  )

  return calculateRaw(method)
}

export const calculateConversionPointsToCash = ({ points, multiplier = '0.20' }) => {
  return Math.floor(
    divide(points, multiplier)
  )
}
