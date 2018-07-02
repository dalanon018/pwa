
import {
  always,
  anyPass,
  both,
  equals,
  ifElse
} from 'ramda'
import { switchFn } from 'utils/logicHelper'

export const ERROR_CODES = {
  VERIFICATION_EXPIRES: 'VERIFICATION_EXPIRES',
  EMPTY_QUANTITY: 'EMPTY_QUANTITY',
  ERROR_SUBMISSION: 'ERROR_SUBMISSION',
  COUPON_INVALID: 'COUPON_INVALID',
  QUOTA_EXCEED_ERROR: 'QUOTA_EXCEED_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR'
}

export const handleErrorMessage = ({ code, errors, defaultError }) => switchFn(errors)(defaultError)(code)

export const storageHandlingError = ({ code = 0, message = '', number = 0 } = {}) => {
  const quotaExceed = ifElse(
    anyPass([
      () => equals(number, -2147024882),
      both(() => equals('NS_ERROR_DOM_QUOTA_REACHED', message), equals(1014)),
      equals(22)
    ]),
    always(ERROR_CODES.QUOTA_EXCEED_ERROR),
    always(ERROR_CODES.NETWORK_ERROR)
  )
  console.log(code)
  return quotaExceed(code)
}
