import {
  compose,
  divide,
  ifElse,
  multiply,
  prop,
  propEq
} from 'ramda'

export const calculateEarnPoints = ({ method, multiplier, amount }) => {
  console.log({method})
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
    // Math.floor(
    //   multiply(
    //     multiplier,
    //     multiply(amount, prop('value')
    //     )
    //   )
    // ),
}

export const calculateConversionPointsToCash = ({ points, multiplier = '0.20' }) => {
  return Math.floor(
    divide(points, multiplier)
  )
}
