/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_SAMPLE_API,
  SET_SAMPLE_API
} from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}

export function getSampleApiAction (payload) {
  return {
    type: GET_SAMPLE_API,
    payload
  }
}

export function setSampleApiAction (payload) {
  return {
    type: SET_SAMPLE_API,
    payload
  }
}
