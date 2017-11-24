/*
 *
 * Buckets constants
 *
 */

export const GET_PRODUCT_CATEGORIES = 'app/Buckets/GET_PRODUCT_CATEGORIES'
export const SET_PRODUCT_CATEGORIES = 'app/Buckets/SET_PRODUCT_CATEGORIES'

export const GET_BRANDS = 'app/Buckets/GET_BRANDS'
export const SET_BRANDS = 'app/Buckets/SET_BRANDS'

export const GET_MOBILE_NUMBERS = 'app/Buckets/GET_MOBILE_NUMBERS'
export const SET_MOBILE_NUMBERS = 'app/Buckets/SET_MOBILE_NUMBERS'

export const GET_RECEIPT_UPDATED = 'app/Buckets/GET_RECEIPT_UPDATED'
export const SET_RECEIPT_UPDATED = 'app/Buckets/SET_RECEIPT_UPDATED'

export const SET_NETWORK_ERROR = 'app/Buckets/SET_NETWORK_ERROR'

export const SET_TOGGLE = 'app/Buckets/SET_TOGGLE'

export const GET_PAGE_TITLE = 'app/Container/GET_PAGE_TITLE'
export const SET_PAGE_TITLE = 'app/Container/SET_PAGE_TITLE'

export const SET_HEADER_FULL_SCREEN = 'app/Container/SET_HEADER_FULL_SCREEN'

export const GET_SHOW_SEARCH_ICON = 'app/Container/GET_SHOW_SEARCH_ICON'
export const SET_SHOW_SEARCH_ICON = 'app/Container/SET_SHOW_SEARCH_ICON'

export const GET_SHOW_ACTIVITY_ICON = 'app/Container/GET_SHOW_ACTIVITY_ICON'
export const SET_SHOW_ACTIVITY_ICON = 'app/Container/SET_SHOW_ACTIVITIES_ICON'

export const REGISTER_PUSH = 'app/Container/REGISTER_PUSH'
export const GET_REGISTED_PUSH = 'app/Container/GET_REGISTED_PUSH'
export const SET_REGISTED_PUSH = 'app/Container/SET_REGISTED_PUSH'

export const GET_LOYALTY_TOKEN = 'app/Container/GET_LOYALTY_TOKEN'
export const SET_LOYALTY_TOKEN = 'app/Container/SET_LOYALTY_TOKEN'
// TECHNICALLY SIGN OUT IS WHEN WE REMOVE THE LOYALTY TOKEN
export const REMOVE_LOYALTY_TOKEN = 'app/Container/REMOVE_LOYALTY_TOKEN'

export const HIDE_BACK_BUTTON = [
  '',
  'home',
  'purchases'
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
  'PROCESSING': 'PROCESSING',
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
  'PROCESSING',
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

export const COMPLETED = [
  'CLAIMED'
]

export const EXPIRED = [
  'UNPAID',
  'UNCLAIMED'
]

export const DEFAULT_METHOD_PAYMENT = 'CASH'
export const DEFAULT_STATUS_COD_PAYMENT = 'CONFIRMED'

export const COD_STATUS_NAME_AFFECTED = {
  'RESERVED': 'PROCESSING',
  'CONFIRMED': 'PROCESSING'
}

export const COD_DATE_ORDERED_STATUS = [
  'CONFIRMED',
  'INTRANSIT'
]
