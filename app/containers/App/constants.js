/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS'
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS'
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR'
export const DEFAULT_LOCALE = 'en'

export const TOKEN_URL = process.env.TOKEN_URL
export const API_BASE_URL = process.env.API_BASE_URL
export const APP_BASE_URL = process.env.APP_BASE_URL
export const STORE_LOCATOR_URL = process.env.STORE_LOCATOR_URL
export const OATH_CLIENT_ID = process.env.OATH_CLIENT_ID
export const OATH_CLIENT_SECRET = process.env.OATH_CLIENT_SECRET
export const OATH_RESPONSE_TYPE = process.env.OATH_RESPONSE_TYPE
export const OATH_GRANT_TYPE = process.env.OATH_GRANT_TYPE
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY

// so we can disable functions that for production only
export const ENVIROMENT = process.env.NODE_ENV

export const LAST_VIEWS_KEY = 'boilerplate/App/LAST_VIEWS'
export const CURRENT_PRODUCT_KEY = 'boilerplate/App/CURRENT_PRODUCT'
export const MOBILE_NUMBERS_KEY = 'boilerplate/App/MOBILE_NUMBERS'
export const ORDERED_LIST_KEY = 'boilerplate/App/ORDERED_LIST'
export const PURCHASED_PRODUCTS_KEY = 'boilerplate/App/PURCHASED_PRODUCTS'
export const ACCESS_TOKEN_KEY = 'boilerplate/App/ACCESS_TOKEN'
export const CATEGORIES_KEY = 'boilerplate/App/CATEGORIES_KEY'
export const BRANDS_KEY = 'boilerplate/App/BRANDS_KEY'
export const STORE_LOCATIONS_KEY = 'boilerplate/App/STORE_LOCATIONS_KEY'
