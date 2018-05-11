/**
*
* FeaturedBrands
*
*/

import React from 'react'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'
import { range } from 'lodash'

import { imageStock } from 'utils/image-stock'

import BrandsContainer from 'components/Shared/PlainCard'

const Wrapper = styled.div`
  align-items: center;
  display: flex;

  img {
    // width: 150px;
  }
`

const ImageWrapper = styled.div`
  height: 100%;

  &:last-child {
    border: 0 !important;
  }
`

const imgixOptions = {
  w: 200,
  h: 200,
  auto: 'compress',
  q: 50,
  lossless: 0
}

function FeaturedBrands ({ brands, loader, changeRoute }) {
  const goToBrand = (id) => () => changeRoute(`/brands/${id}`)

  return (
    <BrandsContainer borderRadius height={200} >
      <Wrapper>
        {
          loader ? range(8).map((_, index) => (
            <ImageWrapper key={index} className='border_left__one--light-grey cursor__pointer'>
              <DefaultState />
            </ImageWrapper>
          )) : brands.map(brand => {
            return (
              <ImageWrapper key={brand.get('id')} className='border_left__one--light-grey cursor__pointer' onClick={goToBrand(brand.get('id'))}>
                <Image src={brand.get('logo') ? brand.get('logo') : imageStock('Brands-Default.jpg', imgixOptions)} alt='CLiQQ' className='height__inherit' />
              </ImageWrapper>
            )
          })
        }
      </Wrapper>
    </BrandsContainer>
  )
}

const DefaultState = () => <Image src={imageStock('Brands-Default.jpg', imgixOptions)} alt='CLiQQ' />

FeaturedBrands.propTypes = {

}

export default FeaturedBrands
