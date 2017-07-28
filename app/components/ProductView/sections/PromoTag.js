/**
*
* ProductPromoTag
*
*/

import React from 'react'

import {
  RibbonWrapper
} from '../styles'

const isPercentOrValue = (type) => {
  return type.toUpperCase() === 'PERCENTAGE' ? '%' : null
}

function PromoTag ({ discount }) {
  return (
    <RibbonWrapper>
      <div className='ribbon-tag'>
        <p className='ribbon-text'>
          {`${discount.get('value')}${isPercentOrValue(discount.get('discountType'))} OFF`}
        </p>
      </div>
    </RibbonWrapper>
  )
}

PromoTag.propTypes = {

}

export default PromoTag
