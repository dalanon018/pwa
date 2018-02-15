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
  handleMouseEnter,
  handleMouseLeave,
  isLowerdots,
  active,
  hover,
  toggleLightBox,
  lightBoxImage,
  images,
  slidesToShow }) {
  return <HandleBlock
    loader={loader}
    images={images}
    active={active}
    handleMouseEnter={handleMouseEnter}
    handleMouseLeave={handleMouseLeave}
    hover={hover}
    toggleLightBox={toggleLightBox}
    lightBoxImage={lightBoxImage}
    isInfinite={isInfinite || false}
    isLowerdots={isLowerdots || false}
    slidesToShow={slidesToShow || 1}
    />
}

const imgixOptions = {
  w: 1170,
  h: 400,
  fit: 'clamp', // we need to make sure that this is clamp so it will base on the container.
  auto: 'compress',
  q: 35,
  lossless: 0
}

export const HandleBlock = ({
  loader,
  isInfinite,
  active,
  handleMouseEnter,
  handleMouseLeave,
  hover,
  isLowerdots,
  lightBoxImage,
  toggleLightBox,
  images,
  slidesToShow }) => {
  let block

  const thumbnailPagination = i => <img key={i} src={images[i]} />

  const settings = {
    autoplay: toggleLightBox || active ? false : images.length > 1,
    swipe: images.length > 1,
    autoplaySpeed: 4000,
    dots: images.length > 1,
    infinite: active ? true : isInfinite,
    speed: 1000,
    fade: !!toggleLightBox,
    arrows: !!active,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    lazyLoad: true,
    initialSlide: active ? parseInt(active) : 0,
    customPaging: i => thumbnailPagination(i)
    // centerMode: true
  }

  if (loader || images.length === 0) {
    block = <DefaultState loader={loader} />
  } else {
    block = <BannerSliderWrapper hover={hover} toggleLightBox={toggleLightBox} active={active} isLowerdots={isLowerdots}>
      <SlideShow
        settings={settings}
        images={images}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        active={active}
        toggleLightBox={toggleLightBox} />
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
  images: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number
}

export default BannerSlider
