
import { switchFn } from 'utils/logicHelper'

export const ERROR_CODES = {
  VERIFICATION_EXPIRES: 'VERIFICATION_EXPIRES',
  EMPTY_QUANTITY: 'EMPTY_QUANTITY',
  ERROR_SUBMISSION: 'ERROR_SUBMISSION'
}

export const handleErrorMessage = ({ code, errors, defaultError }) => switchFn(errors)(defaultError)(code)
