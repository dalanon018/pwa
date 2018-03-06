/**
*
* BrandSlider
*
*/

import React from 'react'
// import styled from 'styled-components';

import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Container, Image } from 'semantic-ui-react'
import { range } from 'lodash'

import PlainCard from 'components/Mobile/PlainCard'

import TestBrand from 'images/test-images/best-foods.png'

import Carousel from 'react-slick'

import { imageStock } from 'utils/image-stock'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

export const BrandsWrapper = styled.div`
  .slick-list {
    padding: 2px;
  }
`

const SliderItem = styled.div`
  margin-right: 10px;

  // temporary
  img {
    width: 90px;
  }
`

const imgixOptions = {
  w: 90,
  h: 90,
  auto: 'compress',
  q: 35,
  lossless: 0
}

function BrandSlider ({ brands, loader, changeRoute }) {
  const goToBrand = (id) => () => changeRoute(`/brands/${id}`)

  var settings = {
    arrows: false,
    slidesToShow: 1,
    speed: 800,
    swipeToSlide: true,
    variableWidth: true
  }

  return (
    <Container>
      <BrandsWrapper>
        <Carousel {...settings}>
          {
            loader ? range(4).map((_, index) => <SliderItem key={index}><DefaultState /></SliderItem>)
            : brands.map((brand, index) => {
              return (
                <SliderItem key={index} onClick={goToBrand(brand.get('id'))}>
                  <PlainCard size={94}>
                    <Image src={TestBrand} alt='CLiQQ' />
                  </PlainCard>
                </SliderItem>
              )
            })
          }
        </Carousel>
      </BrandsWrapper>
    </Container>
  )
}

const DefaultState = () => {
  return (
    <PlainCard>
      <Image src={imageStock('Brands-Default.jpg', imgixOptions)} alt='CLiQQ' />
    </PlainCard>
  )
}

BrandSlider.propTypes = {
  brands: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default BrandSlider
