import {
  multiply,
  divide
} from 'ramda'

export const calculateEarnPoints = ({ method, multiplier, percentage, amount }) => {
  return Math.floor(multiply(multiplier,
    multiply(amount,
      divide(percentage, 100)
    )
  ))
}
