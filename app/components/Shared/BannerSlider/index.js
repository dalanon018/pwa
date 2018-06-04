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
  images,
  slidesToShow,
  autoplay
}) {
  return <HandleBlock
    loader={loader}
    images={images}
    isInfinite={isInfinite || false}
    isLowerdots={isLowerdots || false}
    slidesToShow={slidesToShow || 1}
    autoplay={autoplay}
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
  images,
  slidesToShow = 1,
  autoplay = true
}) => {
  let block
  const settings = {
    // @TODO:
    // for now we will make this false since it's causing issue with setState on desktop
    autoplay: false,
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
    block = <BannerSliderWrapper isLowerdots={isLowerdots}>
      <SlideShow settings={settings} images={images} />
    </BannerSliderWrapper>
  }
  return block
}

export const DefaultState = ({
  productPageTrigger
}) => {
  return (
    <BannerSliderWrapper>
      <EmptyDataBlock productPageTrigger={productPageTrigger}>
        <ImageWrapper image={imageStock('Slider-Default.jpg', imgixOptions)} />
      </EmptyDataBlock>
    </BannerSliderWrapper>
  )
}

BannerSlider.propTypes = {
  loader: PropTypes.bool.isRequired,
  isInfinite: PropTypes.bool,
  images: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  slidesToShow: PropTypes.number
}

export default BannerSlider
