import {
  cond,
  equals
} from 'ramda'

const transformModePayment = (entity) => {
  const adjustmentObject = cond([
    [equals('PREPAID'), () => 'CASH'],
    [equals('COD'), () => 'COD']
  ])

  return adjustmentObject(entity)
}

const Brand = async (entity) => {
  try {
    return transformModePayment(entity)
  } catch (err) {
    throw err
  }
}

export default Brand
