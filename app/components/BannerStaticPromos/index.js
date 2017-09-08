/**
*
* BannerStaticPromos
*
*/

import React from 'react'

import { imageStock, paramsImgix } from 'utils/image-stock'

import EmptyDataBlock from 'components/EmptyDataBlock'

import { Image } from 'semantic-ui-react'
import { BannerWrapper } from './styles'
import {
  compose,
  partialRight
} from 'ramda'

function BannerStaticPromos ({
  loader
}) {
  const imgixOptions = {
    auto: 'format',
    q: 75,
    lossless: 0
  }

  const bannerImage = compose(
    partialRight(paramsImgix, [imgixOptions]),
    imageStock
  )

  if (!loader) {
    return (
      <BannerWrapper>
        <div className='item'>
          <Image alt='Cliqq' src={(bannerImage('sample-banner-promo.png')) || bannerImage('default-banner-promo.png')} />
        </div>
        <div className='item'>
          <Image alt='Cliqq' src={bannerImage('sample-banner-promo.png') || bannerImage('default-banner-promo.png')} />
        </div>
      </BannerWrapper>
    )
  } else {
    return (
      <BannerWrapper background={bannerImage('broken-image.jpg')}>
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
