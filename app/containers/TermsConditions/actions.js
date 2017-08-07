/*
 *
 * TermsConditions actions
 *
 */

import {
  GET_MARKDOWN,
  SET_MARKDOWN
} from './constants'

export function getMarkDownAction () {
  return {
    type: GET_MARKDOWN
  }
}

export function setMarkDownAction (payload) {
  return {
    type: SET_MARKDOWN,
    payload
  }
}
