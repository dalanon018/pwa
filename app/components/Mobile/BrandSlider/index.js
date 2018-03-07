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

import { imageStock } from 'utils/image-stock'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

export const Wrapper = styled.div`
  display: block;
  margin-bottom: -15px;
  position: relative;
  width: 100%;
`

export const BrandsWrapper = styled.div`
  overflow-y: hidden;
  width: ${props => (94 * props.size) + (10 * props.size) - 10}px;

  .slick-list {
    padding: 2px;
  }
`

export const BrandsContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 15px;
`

export const HideScroll = styled.div`
  background-color: #f4f4f4;
  bottom: 0;
  height: 15px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
`

export const SliderItem = styled.div`
  margin-right: 10px;
  display: inline-block;

  // temporary
  img {
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

function BrandSlider ({ brands, loader, changeRoute }) {
  const goToBrand = (id) => () => changeRoute(`/brands/${id}`)

  return (
    <Container>
      <Wrapper>
        <BrandsContainer>
          <div>
            <HideScroll />
            <BrandsWrapper size={brands.size ? brands.size : 4}>
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
            </BrandsWrapper>
          </div>
        </BrandsContainer>
      </Wrapper>
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
