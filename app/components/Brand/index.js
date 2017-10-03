/**
*
* Brand
*
*/

import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import SampleBrand from 'images/test-images/v2/Penshoppe.jpg'

const BrandWrapper = styled.div`
  cursor: pointer;
`

function Brand () {
  return (
    <Grid padded columns='2'>
      <Grid.Column>
        <BrandWrapper>
          <Image src={SampleBrand} />
        </BrandWrapper>
      </Grid.Column>
      <Grid.Column>
        <Image src={SampleBrand} />
      </Grid.Column>
      <Grid.Column>
        <Image src={SampleBrand} />
      </Grid.Column>
      <Grid.Column>
        <Image src={SampleBrand} />
      </Grid.Column>
    </Grid>
  )
}

Brand.propTypes = {

}

export default Brand
