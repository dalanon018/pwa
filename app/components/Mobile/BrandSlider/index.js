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

import PlainCard from 'components/Shared/PlainCard'

import { imageStock } from 'utils/image-stock'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

export const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
`

export const BrandsWrapper = styled.div`
  overflow-y: hidden;
  width: ${props => (94 * props.size) + (10 * props.size) - 10}px;
`

export const BrandsContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
    visibility: hidden;
  }
`

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

function BrandSlider ({ brands, loader, changeRoute }) {
  const goToBrand = (id) => () => changeRoute(`/brands/${id}`)

  return (
    <Container>
      <Wrapper>
        <BrandsContainer>
          <BrandsWrapper size={brands.size ? brands.size : 4}>
            {
              loader ? range(4).map((_, index) => <SliderItem key={index}><DefaultState /></SliderItem>)
                : brands.map((brand, index) => {
                  return (
                    <SliderItem key={index} onClick={goToBrand(brand.get('id'))}>
                      <PlainCard width={94} height={94}>
                        <Image src={brand.get('logo') !== '' ? brand.get('logo') : imageStock('Brands-Default.jpg', imgixOptions)} alt='CLiQQ' />
                      </PlainCard>
                    </SliderItem>
                  )
                })
            }
          </BrandsWrapper>
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
