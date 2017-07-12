/**
*
* ProductPromoTag
*
*/

import React from 'react'

import {
  RibbonWrapper
} from '../styles'

function PromoTag ({ text }) {
  return (
    <RibbonWrapper>
      <div className='ribbon-tag'>
        <p className='ribbon-text'>{text}</p>
      </div>
    </RibbonWrapper>
  )
}

PromoTag.propTypes = {

}

export default PromoTag
