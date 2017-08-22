/*
 *
 * Buckets constants
 *
 */

export const GET_PRODUCT_CATEGORIES = 'app/Buckets/GET_PRODUCT_CATEGORIES'
export const SET_PRODUCT_CATEGORIES = 'app/Buckets/SET_PRODUCT_CATEGORIES'

export const GET_MOBILE_NUMBERS = 'app/Buckets/GET_MOBILE_NUMBERS'
export const SET_MOBILE_NUMBERS = 'app/Buckets/SET_MOBILE_NUMBERS'

export const GET_RECEIPT_UPDATED = 'app/Buckets/GET_RECEIPT_UPDATED'
export const SET_RECEIPT_UPDATED = 'app/Buckets/SET_RECEIPT_UPDATED'

export const SET_NETWORK_ERROR = 'app/Buckets/SET_NETWORK_ERROR'

export const SET_TOGGLE = 'app/Buckets/SET_TOGGLE'

export const HIDE_BACK_BUTTON = [
  '/',
  '/home',
  '/barcodes'
]

export const STATUSES = {
  'DELIVERED TO WAREHOUSE': 'RESERVED',
  'CREATED': 'RESERVED',
  'FOR RELEASE': 'UNPAID',
  'RELEASED': 'UNPAID',
  'FOR RESERVATION': 'RESERVED',
  'RESERVED': 'RESERVED',
  'FOR CANCELLATION': 'RESERVED',
  'CANCELLED': 'RESERVED',
  'FOR CONFIRMATION': 'RESERVED',
  'CONFIRMED': 'CONFIRMED',
  'PL GEN COMPLETED': 'CONFIRMED',
  'FOR SORTING': 'CONFIRMED',
  'FOR DELIVERY': 'CONFIRMED',
  'NO STOCK': 'CONFIRMED',
  'IN-TRANSIT': 'INTRANSIT',
  'UNSERVED': 'INTRANSIT',
  'LOST': 'INTRANSIT',
  'DELIVERED TO STORE': 'DELIVERED',
  'PULLED OUT FROM STORE': 'CLAIMED',
  'CLAIMED': 'CLAIMED',
  'FOR PULL OUT': 'UNCLAIMED',
  'RETURNED TO MERCHANT': 'UNCLAIMED',
  'FOR RETURN TO MERCHANT': 'UNCLAIMED',
  'FOR RETURN': 'UNCLAIMED',
  'RETURNED': 'UNCLAIMED',
  'REFUNDED': 'UNCLAIMED',
  'FOR REFUND': 'UNCLAIMED'
}

export const PURCHASE_ORDER = [
  'RESERVED',
  'CONFIRMED',
  'INTRANSIT',
  'DELIVERED'
]

export const PURCHASE_USECASE = [
  'UNPAID',
  'REPURCHASED',
  'CLAIMED',
  'UNCLAIMED'
]
