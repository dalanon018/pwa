/**
*
* Brand
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router'

import defaultCategoryBackground from 'images/default-categories.jpg'

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
      max-width: 420px;
      margin: 0 auto;
    }
  }
`

function Brand ({ brands }) {
  return (
    <BrandContainer>
      <Grid padded columns='2'>
        {
          brands.map((brand) => (
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

Brand.propTypes = {
  brands: PropTypes.object.isRequired
}

export default Brand
