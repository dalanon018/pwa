/**
*
* BannerSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import { imageStock } from 'utils/image-stock'

import EmptyDataBlock from 'components/Shared/EmptyDataBlock'
import SlideShow from './SlideShow'

import {
  BannerSliderWrapper,
  ImageWrapper
} from './styles'

function BannerSlider ({
  loader,
  isInfinite,
  isLowerdots,
  toggleLightBox,
  isProductPage,
  lightBoxImage,
  percentage,
  images,
  slidesToShow,
  autoplay,
  curved,
  isHome,
  isPromo,
  promo
}) {
  return <HandleBlock
    loader={loader}
    images={images}
    percentage={percentage}
    isInfinite={isInfinite || false}
    isLowerdots={isLowerdots || false}
    slidesToShow={slidesToShow || 1}
    toggleLightBox={toggleLightBox}
    lightBoxImage={lightBoxImage}
    autoplay={autoplay}
    curved={curved}
    isHome={isHome}
    isPromo={isPromo}
    promo={promo}
    isProductPage={isProductPage}
    />
}

const imgixOptions = {
  w: 414,
  h: 246,
  fit: 'clamp', // we need to make sure that this is clamp so it will base on the container.
  auto: 'compress',
  q: 35,
  lossless: 0
}

export const HandleBlock = ({
  loader,
  isInfinite,
  isLowerdots,
  percentage,
  images,
  isHome,
  isPromo,
  isProductPage,
  toggleLightBox,
  lightBoxImage,
  promo,
  curved,
  slidesToShow = 1,
  autoplay = true
}) => {
  let block
  const settings = {
    autoplay: autoplay && images.length > 1,
    swipe: images.length > 1,
    autoplaySpeed: 3500,
    dots: images.length > 1,
    infinite: isInfinite,
    speed: 1000,
    arrows: false,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    lazyLoad: true
  }

  if (loader || images.length === 0) {
    block = <DefaultState loader={loader} />
  } else {
    block = <BannerSliderWrapper curved={curved} isLowerdots={isLowerdots} toggleLightBox={toggleLightBox}>
      <SlideShow
        toggleLightBox={toggleLightBox}
        settings={settings}
        images={images}
        isHome={isHome}
        percentage={percentage}
        isPromo={isPromo}
        isProductPage={isProductPage}
        promo={promo} />
    </BannerSliderWrapper>
  }
  return block
}

export const DefaultState = ({
  productPageTrigger,
  curved
}) => {
  return (
    <BannerSliderWrapper curved={curved}>
      <EmptyDataBlock productPageTrigger={productPageTrigger}>
        <ImageWrapper image={imageStock('Slider-Default.jpg', imgixOptions)} />
      </EmptyDataBlock>
    </BannerSliderWrapper>
  )
}

BannerSlider.propTypes = {
  loader: PropTypes.bool.isRequired,
  isInfinite: PropTypes.bool,
  images: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number
}

export default BannerSlider
