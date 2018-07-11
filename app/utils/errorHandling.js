
import {
  always,
  anyPass,
  both,
  equals,
  ifElse
} from 'ramda'
import { switchFn } from 'utils/logicHelper'
import { DateFormater } from 'utils/date'

export const ERROR_CODES = {
  VERIFICATION_EXPIRES: 'VERIFICATION_EXPIRES',
  EMPTY_QUANTITY: 'EMPTY_QUANTITY',
  ERROR_SUBMISSION: 'ERROR_SUBMISSION',
  COUPON_INVALID: 'COUPON_INVALID',
  QUOTA_EXCEED_ERROR: 'QUOTA_EXCEED_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR'
}

export const COUPON_ERROR_MESSAGES = {
  '2018-07-11': {
    404: `Oh nos! You've used that coupon before! We have other great deals on our site. VISIT NOW!`,
    default: `Hold up! That coupon code's been used! BUT WAIT! Visit our site now and get mind blown!`
  },
  '2018-07-12': {
    404: `Heya, friend! That coupon's no longer valid! Use #711TY on our flash deals and get...a surprise!`,
    default: `Hold up! That coupon code's expired! Try #711TY on our flash deals and get mind blown!`
  },
  '2018-07-13': {
    404: `Heya, friend! That coupon's no longer valid! Use #711TY on our flash deals and get...a surprise!`,
    default: `Hold up! That coupon code's expired! Try #711TY on our flash deals and get mind blown!`
  },
  default: {
    404: `Ahoy, mate! Sorry about that! Please visit our website for great deals while we fix the issue.`,
    default: `Ooops! That's embarrassing! Check out our website while we fix the issue.`
  }
}

export const handleErrorMessage = ({ code, errors, defaultError }) => switchFn(errors)(defaultError)(code)

export const sevenElevenCouponPromoErrorHandling = ({ code = 'default' }) => {
  const currentDate = DateFormater(new Date(), 'YYYY-MM-DD')
  const couponError = COUPON_ERROR_MESSAGES[currentDate] || COUPON_ERROR_MESSAGES['default']
  return couponError[code]
}

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
