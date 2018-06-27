
import { switchFn } from 'utils/logicHelper'

export const ERROR_CODES = {
  VERIFICATION_EXPIRES: 'VERIFICATION_EXPIRES',
  EMPTY_QUANTITY: 'EMPTY_QUANTITY',
  ERROR_SUBMISSION: 'ERROR_SUBMISSION',
  COUPON_INVALID: 'COUPON_INVALID'
}

export const handleErrorMessage = ({ code, errors, defaultError }) => switchFn(errors)(defaultError)(code)
