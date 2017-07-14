/**
*
* NavCategories
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'
import { NavCategoriesWrapper, CategoryIcon } from './styles'
import { Grid } from 'semantic-ui-react'

import sampleCategoryIcon from 'images/test-images/category-test.svg'

function NavCategories () {
  return (
    <NavCategoriesWrapper>
      <Grid padded textAlign='center'>
        <Grid.Row columns={5}>
          <Grid.Column>
            <CategoryIcon background={sampleCategoryIcon} />
            <p>APPAREL</p>
          </Grid.Column>
          <Grid.Column>
            <CategoryIcon background={sampleCategoryIcon} />
            <p>ACCESSORIES</p>
          </Grid.Column>
          <Grid.Column>
            <CategoryIcon background={sampleCategoryIcon} />
            <p>FRAGRANCES</p>
          </Grid.Column>
          <Grid.Column>
            <CategoryIcon background={sampleCategoryIcon} />
            <p>GADGETS</p>
          </Grid.Column>
          <Grid.Column>
            <CategoryIcon background={sampleCategoryIcon} />
            <p>MORE</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </NavCategoriesWrapper>
  )
}

NavCategories.propTypes = {

}

export default NavCategories
