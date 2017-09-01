/**
*
* BannerStaticPromos
*
*/

import React from 'react'

import { imageStock } from 'utils/image-stock'

import EmptyDataBlock from 'components/EmptyDataBlock'

import { Image } from 'semantic-ui-react'
import { BannerWrapper } from './styles'

function BannerStaticPromos ({
  loader
}) {
  if (!loader) {
    return (
      <BannerWrapper>
        <div className='item'>
          <Image src={imageStock('sample-banner-promo.png') || imageStock('default-banner-promo.png')} />
        </div>
        <div className='item'>
          <Image src={imageStock('sample-banner-promo.png') || imageStock('default-banner-promo.png')} />
        </div>
      </BannerWrapper>
    )
  } else {
    return (
      <BannerWrapper background={imageStock('broken-image.jpg')}>
        <EmptyDataBlock>
          <div className='item loader-image' />
        </EmptyDataBlock>
        <EmptyDataBlock>
          <div className='item loader-image' />
        </EmptyDataBlock>
      </BannerWrapper>
    )
  }
}

BannerStaticPromos.propTypes = {

}

export default BannerStaticPromos
