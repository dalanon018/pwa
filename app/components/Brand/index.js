/**
*
* Brand
*
*/

import React, { PropTypes } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

// import SampleBrand from 'images/test-images/v2/Penshoppe.jpg'

const BrandWrapper = styled.div`
  cursor: pointer;
`

function Brand ({ brands }) {
  return (
    <Grid padded columns='2'>
      {
        brands.map((brand) => (
          <Grid.Column key={brand.get('id')} >
            <BrandWrapper>
              <Image alt={brand.get('name')} src={brand.get('background')} />
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
