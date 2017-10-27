import {
  __,
  compose,
  concat,
  drop,
  identity,
  ifElse,
  is,
  join,
  match,
  slice,
  toLower,
  toUpper
} from 'ramda'

const Uppercase = (str) => ifElse(
  is(String),
  compose(
    concat(__, str ? toLower(str.slice(1)) : ''),
    compose(toUpper, slice(0, 1))
  ),
  identity
)(str)

const PhoneFormatter = (str) => ifElse(
  is(String),
  compose(
    join('-'),
    drop(1),
    match(/^(\d{3})(\d{3})(\d{4})$/),
    drop(3) // since number format is (+63999) we have to remove the +63
  ),
  identity
)(str)

const Pad = (str = '', max = 4) => {
  str = str ? str.toString() : ''
  return str.length < max ? Pad('0' + str, max) : str
}

export {
  Uppercase,
  PhoneFormatter,
  Pad
}
