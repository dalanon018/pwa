import {
  __,
  compose,
  is,
  ifElse,
  identity,
  concat,
  slice,
  toUpper,
  toLower
} from 'ramda'

const Uppercase = (str) => ifElse(
  is(String),
  compose(
    concat(__, str ? toLower(str.slice(1)) : ''),
    compose(toUpper, slice(0, 1))
  ),
  identity
)(str)

export {
  Uppercase
}
