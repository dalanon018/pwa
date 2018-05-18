/*
 *
 * Buckets constants
 *
 */

export const SET_ROUTE_NAME = 'app/Buckets/SET_ROUTE_NAME'

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

export const SET_LIGHTBOX_IMAGE = 'app/Buckets/SET_LIGHTBOX_IMAGE'

export const GET_PAGE_TITLE = 'app/Container/GET_PAGE_TITLE'
export const SET_PAGE_TITLE = 'app/Container/SET_PAGE_TITLE'

export const SET_HEADER_FULL_SCREEN = 'app/Container/SET_HEADER_FULL_SCREEN'

export const GET_SHOW_SEARCH_ICON = 'app/Container/GET_SHOW_SEARCH_ICON'
export const SET_SHOW_SEARCH_ICON = 'app/Container/SET_SHOW_SEARCH_ICON'

export const GET_SHOW_POINTS_ICON = 'app/Container/GET_SHOW_POINTS_ICON'
export const SET_SHOW_POINTS_ICON = 'app/Container/SET_SHOW_POINTS_ICON'

export const GET_SHOW_ACTIVITY_ICON = 'app/Container/GET_SHOW_ACTIVITY_ICON'
export const SET_SHOW_ACTIVITY_ICON = 'app/Container/SET_SHOW_ACTIVITIES_ICON'

export const REGISTER_PUSH = 'app/Container/REGISTER_PUSH'
export const GET_REGISTED_PUSH = 'app/Container/GET_REGISTED_PUSH'
export const SET_REGISTED_PUSH = 'app/Container/SET_REGISTED_PUSH'

export const GET_LOYALTY_TOKEN = 'app/Container/GET_LOYALTY_TOKEN'
export const SET_LOYALTY_TOKEN = 'app/Container/SET_LOYALTY_TOKEN'
// TECHNICALLY SIGN OUT IS WHEN WE REMOVE THE LOYALTY TOKEN
export const REMOVE_LOYALTY_TOKEN = 'app/Container/REMOVE_LOYALTY_TOKEN'

export const SET_SEARCH_VALUE = 'app/Buckets/SET_SEARCH_VALUE'

// REDIRECTING TO MAP LOCATION
export const STORE_LOCATOR = 'app/Buckets/STORE_LOCATOR'
// REDIRECTING TO RECENT STORE
export const RECENT_STORE_LOCATION = 'app/Buckets/RECENT_STORE_LOCATION'

export const FAQ_URL = 'https://s3-ap-southeast-1.amazonaws.com/cliqq.shop/docs/faq.md'
export const TERMS_URL = 'https://s3-ap-southeast-1.amazonaws.com/cliqq.shop/docs/terms.md'
export const PRIVACY_URL = 'https://s3-ap-southeast-1.amazonaws.com/cliqq.shop/docs/privacy.md'

export const HIDE_BACK_BUTTON = [
  '/',
  '/home',
  '/purchases',
  '/flash-deals',
  '/categories',
  '/brands',
  '/wallet'
]

export const PAYMENTS_OPTIONS = {
  COD: 'COD',
  CASH: 'CASH',
  POINTS: 'POINTS',
  FULL_POINTS: 'FULL_POINTS'
}
export const FULL_POINTS_IDENTIFIER = ['**']

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
  'UNSERVED': 'LOSTINTRANSIT',
  'LOST': 'LOSTINTRANSIT',
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
  'UNCLAIMED',
  'LOSTINTRANSIT'
]

export const COMPLETED = [
  'CLAIMED'
]

export const EXPIRED = [
  'UNPAID',
  'UNCLAIMED',
  'LOSTINTRANSIT'
]

export const DEFAULT_METHOD_PAYMENT = 'CASH'
export const COD_PAYMENT = 'COD'
export const DEFAULT_STATUS_COD_PAYMENT = 'CONFIRMED'

/**
 * SINCE WE CHANGE HOW WE HANDLE OUR PAYMENT METHOD
 * CASH === PREPAID
 * CODE === COD
 *
 * WE NEED TO GET AN EASY WAY ON CONVERTING THEM BACK
 */
export const RAW_PAYMENT_METHODS = {
  CASH: 'PREPAID',
  COD: 'COD'

}

export const COD_STATUS_NAME_AFFECTED = {
  'RESERVED': 'PROCESSING',
  'CONFIRMED': 'PROCESSING'
}

export const COD_DATE_ORDERED_STATUS = [
  'CONFIRMED',
  'INTRANSIT'
]

// WE NAME OUR ROUTES
export const HOME_NAME = 'home'
export const PURCHASES_NAME = 'purchases'
export const RECEIPTPAGE_NAME = 'receiptPage'
export const PRODUCT_NAME = 'productPage'
export const PRODUCTREVIEW_NAME = 'productReview'
export const CATEGORIES_NAME = 'browseCategories'
export const CATEGORIES_LANDING_PAGE = 'categories'
export const FLASH_DEALS_LANDING_PAGE = 'flashDeals'
export const BRANDS_LANDING_PAGE = 'brands'
export const PRODUCTSCATEGORY_NAME = 'productsByCategory'
export const PRODUCTS_FEATURED_NAME = 'productsByFeatured'
export const FAQ_NAME = 'faqPage'
export const PRIVACY_NAME = 'privacyPolicy'
export const TERMS_NAME = 'termsConditions'
export const SEARCH_NAME = 'searchPage'
export const BRAND_NAME = 'brandPage'
export const FEATURES_NAME = 'features'
export const OFFLINE_NAME = 'pageoffline'
export const LOGIN_NAME = 'loginPage'
export const NOTFOUND_NAME = 'pagenotfound'
export const PROMO_PRODUCTS_NAME = 'promoProductsPage'
export const WALLET_NAME = 'walletPage'
export const RECENT_STORE_NAME = 'recentStorePage'
