
import {
  GET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT
} from './constants'

export function getSearchProductAction (payload) {
  return {
    type: GET_SEARCH_PRODUCT,
    payload
  }
}

export function setSearchProductAction (payload) {
  return {
    type: SET_SEARCH_PRODUCT,
    payload
  }
}
