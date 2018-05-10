/**
*
* BrandCarousel
*
*/

import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { Container, Image } from 'semantic-ui-react'
import PlainCard from 'components/Shared/PlainCard'
import styled from 'styled-components'

import { range } from 'lodash'
import { imageStock } from 'utils/image-stock'

export const SliderItem = styled.div`
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;

  // temporary
  img {
    margin: 0 auto;
    padding: 2px;
    width: 90px;
  }

  &:last-child {
    margin-right: 0;
  }
`

const imgixOptions = {
  w: 90,
  h: 90,
  auto: 'compress',
  q: 35,
  lossless: 0
}

const CarouselEntity = ({ index, goToBrand, brand }) => (
  <SliderItem data-cy={`brand-carousel-${index}`} onClick={goToBrand(brand.get('id'))}>
    <PlainCard width={94} height={94}>
      <Image src={brand.get('logo') !== '' ? brand.get('logo') : imageStock('Brands-Default.jpg', imgixOptions)} alt='CLiQQ' />
    </PlainCard>
  </SliderItem>
)

function BrandCarousel ({brands, loader, changeRoute}) {
  const settings = {
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 3500,
    dots: false,
    infinite: false,
    slidesToScroll: 3,
    slidesToShow: 3,
    speed: 1000,
    variableWidth: true
  }
  const goToBrand = (id) => () => changeRoute(`/brands/${id}`)

  return (
    <Container>
      <Slider {...settings}>
        {
          loader ? range(8).map((_, index) => <SliderItem key={index}><DefaultState /></SliderItem>)
          : brands && brands.map((brand, index) => {
            return (
              <CarouselEntity
                key={index}
                index={index}
                brand={brand}
                goToBrand={goToBrand}
              />
            )
          })
        }
      </Slider>
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

BrandCarousel.propTypes = {
  brands: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired
}

export default BrandCarousel
