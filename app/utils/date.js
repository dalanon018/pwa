import moment from 'moment'

/**
 * Format helper
 * @param {*} date
 * @param {*} format
 */
export const DateFormater = (date = String, format = 'MMM DD, YYYY') =>
  moment(date, moment.ISO_8601).format(format)

export const CountdownParser = (date) =>
  (moment(date, moment.ISO_8601).valueOf() / 1000)
