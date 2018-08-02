import {
  identity,
  ifElse
} from 'ramda'
/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
export const switchFn = cases => defaultCase => key =>
  key in cases ? cases[key] : defaultCase

/**
 * easier way to toggle component
 * @param {*} component1
 * @param {*} component2
 */
export const ToggleComponent = (component1, component2) => ifElse(
  identity,
  () => component1,
  () => component2
)
