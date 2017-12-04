/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const switchFn = cases => defaultCase => key =>
key in cases ? cases[key] : defaultCase

export {
  switchFn
}
