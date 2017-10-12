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

const BrandWrapper = styled.div`
  cursor: pointer;

  @media (min-width: 767px) {
    .image {
      width: 100%;
    }
  }
`

function Brand ({ brands }) {
  return (
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
  )
}

Brand.propTypes = {
  brands: PropTypes.object.isRequired
}

export default Brand
