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
  ImageWrapper,
  BrandLogo
} from './styles'

function BannerSlider ({
  receiptPageName,
  loader,
  productPageTrigger,
  homeRouteName,
  windowWidth,
  images }) {
  return <HandleBlock
    loader={loader}
    images={images}
    productPageTrigger={productPageTrigger}
    receiptPageName={receiptPageName}
    homeRouteName={homeRouteName}
    windowWidth={windowWidth} />
}

const HandleBlock = ({
  loader,
  receiptPageName,
  productPageTrigger,
  homeRouteName,
  windowWidth,
  images }) => {
  let block
  const settings = {
    autoplay: homeRouteName && homeRouteName.name && images.size > 1,
    swipe: images.size > 1,
    autoplaySpeed: 3500,
    dots: images.size > 1,
    infinite: homeRouteName && !homeRouteName.name,
    speed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const productPage = homeRouteName && homeRouteName.name === 'productPage'

  const imageSize = (image) => {
    if (!homeRouteName && windowWidth >= 768) {
      return `${image}?w=450&h=450&fit=clamp`
    } else if (productPage) {
      return `${image}?w=280&h=280&fit=clamp`
    }
    return image
  }

  if (loader) {
    block = <DefaultState loader={loader} productPageTrigger={productPageTrigger} />
  } else {
    block = <BannerSliderWrapper homeRouteName={homeRouteName} windowWidth={windowWidth} receiptPageName={receiptPageName}>
      <Slider {...settings}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index}>
                {
                  receiptPageName
                    ? item.getIn(['products', 'brandLogo']) &&
                    <BrandLogo brand={item.getIn(['products', 'brandLogo']) && item.getIn(['products', 'brandLogo'])} />
                    : item.get('brandLogo') &&
                    <BrandLogo brand={item.get('brandLogo') && item.get('brandLogo')} />
                }
                {
                  receiptPageName
                  ? <Image src={(item.getIn(['products', 'image']) && imageSize(item.getIn(['products', 'image']))) || imageStock('default-slider.jpg')} />
                  : <Image src={(item.get('image') && imageSize(item.get('image'))) || imageStock('default-slider.jpg')} />
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
