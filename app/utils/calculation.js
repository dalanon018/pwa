
export const calculateEarnPoints = ({ method, multiplier, percentage, amount }) => {
  return Math.floor((multiplier * amount * (percentage / 100)))
}
