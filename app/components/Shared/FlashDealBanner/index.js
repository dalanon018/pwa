/**
*
* FlashDealBanner
*
*/

import React from 'react'
import { Image } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'
import BannerCard from 'components/Shared/PlainCard'

function FlashDealBanner ({
  image,
  width,
  height,
  promosLoading
}) {
  const imgixOptions = {
    w: 800,
    h: 400,
    fit: 'clamp',
    auto: 'compress',
    q: 100,
    lossless: 0
  }

  return (
    <BannerCard borderRadius width={width} height={height}>
      {
        !promosLoading
        ? <Image className='width__full' src={image} alt='CLiQQ' />
        : <Image className='width__full' src={imageStock('Slider-Default.jpg', imgixOptions)} alt='CLiQQ' />
      }
    </BannerCard>
  )
}

FlashDealBanner.propTypes = {

}

export default FlashDealBanner
