import {
  compose,
  divide,
  ifElse,
  multiply,
  prop,
  propEq
} from 'ramda'

export const calculateEarnPoints = ({ method, multiplier, amount }) => {
  const calculateEarn = ifElse(
    propEq('type', 'percentage'),
    compose(
      Math.floor,
      multiply(multiplier),
      multiply(amount),
      prop('value')
    ),
    prop('value')
  )

  return calculateEarn(method)
}

export const calculateConversionPointsToCash = ({ points, multiplier = '0.20' }) => {
  return Math.floor(
    divide(points, multiplier)
  )
}
