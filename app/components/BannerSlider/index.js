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
  homeRouteName,
  windowWidth,
  images }) {
  return <HandleBlock
    loader={loader}
    images={images}
    homeRouteName={homeRouteName}
    windowWidth={windowWidth} />
}

const HandleBlock = ({
  loader,
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
    block = <DefaultState loader={loader} />
  } else {
    block = <BannerSliderWrapper homeRouteName={homeRouteName} windowWidth={windowWidth}>
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
