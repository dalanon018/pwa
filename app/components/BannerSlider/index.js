/**
*
* BannerSlider
*
*/

import React, { PropTypes } from 'react'

import { imageStock } from 'utils/image-stock'

import EmptyDataBlock from 'components/EmptyDataBlock'
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
  slidesToShow }) {
  return <HandleBlock
    loader={loader}
    images={images}
    isInfinite={isInfinite || false}
    isLowerdots={isLowerdots || false}
    slidesToShow={slidesToShow || 1}
    />
}

export const HandleBlock = ({
  loader,
  isInfinite,
  isLowerdots,
  images,
  slidesToShow }) => {
  let block
  const settings = {
    autoplay: images.length > 1,
    swipe: images.length > 1,
    autoplaySpeed: 3500,
    dots: images.length > 1,
    infinite: isInfinite,
    speed: 1000,
    arrows: false,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow
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
        <ImageWrapper image={imageStock('broken-image.jpg')} />
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
