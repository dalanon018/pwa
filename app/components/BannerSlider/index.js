/**
*
* BannerSlider
*
*/

import React, { PropTypes } from 'react'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

import { imageStock } from 'utils/image-stock'

import EmptyDataBlock from 'components/EmptyDataBlock'

import {
  BannerSliderWrapper,
  ImageWrapper
} from './styles'

function BannerSlider ({
  loader,
  isInfinite,
  isAutoPlay,
  isLowerdots,
  images,
  slidesToShow }) {
  return <HandleBlock
    loader={loader}
    images={images}
    isInfinite={isInfinite || false}
    isAutoPlay={isAutoPlay || false}
    isLowerdots={isLowerdots || false}
    slidesToShow={slidesToShow || 1}
    />
}

export const HandleBlock = ({
  loader,
  isInfinite,
  isAutoPlay,
  isLowerdots,
  images,
  slidesToShow }) => {
  let block
  const settings = {
    autoplay: isAutoPlay && images.length > 1,
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
      <Slider {...settings}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index}>
                {
                  (typeof item === 'string' ? <Image alt='Cliqq' src={item} /> : '')
                }
              </div>
            )
          })
        }
      </Slider>
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
  isAutoPlay: PropTypes.bool,
  images: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number
}

export default BannerSlider
