import moment from 'moment'

/**
 * Format helper
 * @param {*} date
 * @param {*} format
 */
export const DateFormater = (date = String, format = 'MMM DD, YYYY') =>
  moment(date, moment.ISO_8601).format(format)

export const CountdownParser = (date) =>
  moment(date, moment.ISO_8601).unix()

export const DateDifferece = (now = String, then = String) =>
   moment(then, 'YYYY-MM-DD HH:mm:ss').diff(moment(now, 'YYYY-MM-DD HH:mm:ss'))

export const AddDate = (time, type = 'minutes', format = 'YYYY-MM-DD HH:mm:ss') =>
  moment().add(time, type).format(format)
