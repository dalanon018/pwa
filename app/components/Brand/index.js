/**
*
* Brand
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router'
import { range } from 'lodash'

import defaultCategoryBackground from 'images/default-categories.jpg'
import EmptyDataBlock from 'components/EmptyDataBlock'

import { paramsImgix } from 'utils/image-stock'

const BrandContainer = styled.div`
  @media (min-width: 1024px) {
    .ui.grid {
      padding: 0 250px;
    }
  }
`

export const BrandWrapper = styled.div`
  cursor: pointer;

  .image {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .image {
      margin: 0 auto;
    }
  }
`

function Brand ({ brands, loader }) {
  return (
    <BrandContainer>
      <Grid padded columns='2'>
        {
          loader ? range(4).map((_, index) => <DefaultState key={index} />)
          : brands.valueSeq().map((brand) => (
            <Grid.Column key={brand.get('id')} >
              <BrandWrapper>
                <Link to={`/brands/${brand.get('id')}`}>
                  <Image alt={brand.get('name')} src={brand.get('background') || defaultCategoryBackground} />
                </Link>
              </BrandWrapper>
            </Grid.Column>
          ))
        }
      </Grid>
    </BrandContainer>
  )
}

const DefaultState = () => {
  const imgixOptions = {
    auto: 'compress',
    q: 75,
    lossless: 0
  }

  return (
    <Grid.Column>
      <EmptyDataBlock>
        <BrandWrapper>
          <Image alt='Cliqq' src={paramsImgix(defaultCategoryBackground, imgixOptions)} className='empty-image' />
        </BrandWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Brand.propTypes = {
  brands: PropTypes.object.isRequired
}

export default Brand
