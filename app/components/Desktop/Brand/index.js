/**
*
* Brand
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Grid, Image } from 'semantic-ui-react'
import { range } from 'lodash'

import EmptyDataBlock from 'components/Shared/EmptyDataBlock'

import { imageStock, paramsImgix } from 'utils/image-stock'

const BrandContainer = styled.div`
  background-color: #EBEBEB;
  margin-top: 30px;
  padding: 20px;
`

export const BrandWrapper = styled.div`
  cursor: pointer;
  min-height: 160px;

  .image {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .image {
      margin: 0 auto;
    }
  }
`

const imgixOptions = {
  w: 300,
  h: 300,
  auto: 'compress',
  q: 100,
  lossless: 0
}

function Brand ({ brands, loader, changeRoute }) {
  const imageShow = (image) => image || imageStock('Brands-Default.jpg', imgixOptions)
  const goToBrand = (id) => () => changeRoute(`/brands/${id}`)
  return (
    <BrandContainer>
      <Grid padded columns='4'>
        {
          loader ? range(4).map((_, index) => <DefaultState key={index} />)
            : brands.valueSeq().map((brand) => (
              <Grid.Column
                key={brand.get('id')}
                onClick={goToBrand(brand.get('id'))}
              >
                <BrandWrapper>
                  <Image alt={brand.get('name')} src={paramsImgix(imageShow(brand.get('background')), imgixOptions)} />
                </BrandWrapper>
              </Grid.Column>
            )
            )
        }
      </Grid>
    </BrandContainer>
  )
}

const DefaultState = () => {
  return (
    <Grid.Column>
      <EmptyDataBlock>
        <BrandWrapper>
          <Image alt='CliQQ' src={paramsImgix(imageStock('Brands-Default.jpg', imgixOptions))} className='empty-image' />
        </BrandWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Brand.propTypes = {
  brands: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default Brand
