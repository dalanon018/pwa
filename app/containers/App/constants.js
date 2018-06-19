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
export const MOBILE_REGISTRATION_URL = process.env.MOBILE_REGISTRATION_URL
export const LOYALTY_URL = process.env.LOYALTY_URL
export const RECENT_STORE_TOKEN = process.env.RECENT_STORE_TOKEN
export const STORE_LOCATOR_URL = process.env.STORE_LOCATOR_URL
export const DESKTOP_URL = process.env.DESKTOP_URL
export const MOBILE_URL = process.env.MOBILE_URL
export const OATH_CLIENT_ID = process.env.OATH_CLIENT_ID
export const OATH_CLIENT_SECRET = process.env.OATH_CLIENT_SECRET
export const OATH_RESPONSE_TYPE = process.env.OATH_RESPONSE_TYPE
export const OATH_GRANT_TYPE = process.env.OATH_GRANT_TYPE
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY
export const FB_SHARE_ID = process.env.FB_SHARE_ID

// so we can disable functions that for production only
export const ENVIROMENT = process.env.NODE_ENV

// to let us know if we have the current session
export const SET_CURRENT_SESSION = 'app/App/SET_CURRENT_SESSION'
// Loader if we are authenticating
export const SET_AUTHENTICATING = 'app/App/SET_AUTHENTICATING'

export const LAST_VIEWS_KEY = 'boilerplate/App/LAST_VIEWS'
export const CURRENT_PRODUCT_KEY = 'boilerplate/App/CURRENT_PRODUCT'
export const MOBILE_NUMBERS_KEY = 'boilerplate/App/MOBILE_NUMBERS'
export const ORDERED_LIST_KEY = 'boilerplate/App/ORDERED_LIST'
export const PURCHASED_PRODUCTS_KEY = 'boilerplate/App/PURCHASED_PRODUCTS'
export const ACCESS_TOKEN_KEY = 'boilerplate/App/ACCESS_TOKEN'
export const CATEGORIES_KEY = 'boilerplate/App/CATEGORIES_KEY'
export const BRANDS_KEY = 'boilerplate/App/BRANDS_KEY'
export const STORE_LOCATIONS_KEY = 'boilerplate/App/STORE_LOCATIONS_KEY'
export const LOYALTY_TOKEN_KEY = 'boilerplate/App/LOYALTY_TOKEN_KEY'
export const VERIFICATION_CODE_KEY = 'boilerplate/App/VERIFICATION_CODE_KEY'

/**
 * this key is for us to save the last selected method before going to map
 * since we dont have holder for what payment they selected going back to
 * review. We can submit through url however it requires changes to their
 * code.
 */
export const LAST_SELECTED_METHOD = 'boilerplate/App/LAST_SELECTED_METHOD'

// ONCE REGISTERED THIS IS THE KEY NAME
export const REGISTERED_PUSH = 'boilerplate/App/REGISTERED_PUSH'
