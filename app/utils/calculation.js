import {
  multiply,
  divide
} from 'ramda'

export const calculateEarnPoints = ({ method, multiplier, percentage, amount }) => {
  return Math.floor(
    multiply(
      multiplier,
      multiply(
        amount,
        percentage
      )
    )
  )
}

export const calculateConversionPointsToCash = ({ points, multiplier = '0.25' }) => {
  return Math.floor(
    divide(points, multiplier)
  )
}
