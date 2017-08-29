/**
*
* BannerSlider
*
*/

import React from 'react'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

import EmptyDataBlock from 'components/EmptyDataBlock'
import defaultImage from 'images/default-slider.jpg'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import {
  BannerSliderWrapper,
  ImageWrapper,
  BrandLogo
} from './styles'

import EmptyImage from 'images/broken-image.jpg'

function BannerSlider ({
  loader,
  productPageTrigger,
  windowWidth,
  images }) {
  return <HandleBlock
    loader={loader}
    images={images}
    productPageTrigger={productPageTrigger}
    windowWidth={windowWidth} />
}

const HandleBlock = ({
  loader,
  productPageTrigger,
  windowWidth,
  images }) => {
  let block
  const settings = {
    autoplay: productPageTrigger && productPageTrigger.name && images.size > 1,
    swipe: images.size > 1,
    autoplaySpeed: 3500,
    dots: images.size > 1,
    infinite: productPageTrigger && !productPageTrigger.name,
    speed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const productPage = productPageTrigger && productPageTrigger.name === 'productPage'

  const mobileShow = () => {
    return productPage && windowWidth >= 768
  }

  const imageSize = (image) => {
    if (productPage) {
      return `${image}?w=280&h=280&fit=clamp`
    }
    return image
  }

  if (loader) {
    block = <DefaultState loader={loader} />
  } else {
    block = <BannerSliderWrapper
      productPageTrigger={productPage}
      productPageSlider={mobileShow()} >
      <Slider {...settings}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index}>
                {
                  item.get('brandLogo') &&
                  <BrandLogo brand={item.get('brandLogo') && item.get('brandLogo')} />
                }
                <Image src={(item.get('image') && imageSize(item.get('image'))) || defaultImage} />
              </div>
            )
          })
        }
      </Slider>
    </BannerSliderWrapper>
  }
  return block
}

const DefaultState = () => {
  return (
    <BannerSliderWrapper>
      <EmptyDataBlock>
        <ImageWrapper image={EmptyImage} />
      </EmptyDataBlock>
    </BannerSliderWrapper>
  )
}

BannerSlider.propTypes = {

}

export default BannerSlider
