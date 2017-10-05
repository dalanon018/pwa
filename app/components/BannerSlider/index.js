/**
*
* BannerSlider
*
*/

import React from 'react'
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
  images }) {
  return <HandleBlock
    loader={loader}
    images={images}
    isInfinite={isInfinite || false}
    isAutoPlay={isAutoPlay || false}
    />
}

const HandleBlock = ({
  loader,
  isInfinite,
  isAutoPlay,
  images }) => {
  let block
  const settings = {
    autoplay: isAutoPlay && images.length > 1,
    swipe: images.length > 1,
    autoplaySpeed: 3500,
    dots: images.length > 1,
    infinite: isInfinite,
    speed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  if (loader) {
    block = <DefaultState loader={loader} />
  } else {
    block = <BannerSliderWrapper>
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

const DefaultState = ({
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

}

export default BannerSlider
