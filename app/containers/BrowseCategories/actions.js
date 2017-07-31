/*
 *
 * BrowseCategories actions
 *
 */

import {
  GET_CATEGORIES,
  SET_CATEGORIES
} from './constants'

export function getCategoriesAction (payload) {
  return {
    type: GET_CATEGORIES,
    payload
  }
}

export function setCategoriesAction (payload) {
  return {
    type: SET_CATEGORIES,
    payload
  }
}
