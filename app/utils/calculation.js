
export const calculateEarnPoints = ({ method, multiplier, percentage, amount }) => {
  return (multiplier * amount * (percentage / 100))
}
