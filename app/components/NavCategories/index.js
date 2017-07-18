/**
*
* NavCategories
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'
import {
  NavCategoriesWrapper,
  NavCategoriesContainer,
  CategoryItem,
  CategoryIcon } from './styles'
import { Grid } from 'semantic-ui-react'

import sampleCategoryIcon from 'images/test-images/category-test.svg'

function NavCategories () {
  return (
    <NavCategoriesWrapper>
      <Grid padded textAlign='center'>
        <Grid.Row columns={5}>
          <NavCategoriesContainer>
            <CategoryItem>
              <CategoryIcon background={sampleCategoryIcon} />
              <p>APPAREL</p>
            </CategoryItem>
            <CategoryItem>
              <CategoryIcon background={sampleCategoryIcon} />
              <p>ACCESSORIES</p>
            </CategoryItem>
            <CategoryItem>
              <CategoryIcon background={sampleCategoryIcon} />
              <p>FRAGRANCES</p>
            </CategoryItem>
            <CategoryItem>
              <CategoryIcon background={sampleCategoryIcon} />
              <p>GADGETS</p>
            </CategoryItem>
            <CategoryItem>
              <CategoryIcon background={sampleCategoryIcon} />
              <p>MORE</p>
            </CategoryItem>
          </NavCategoriesContainer>
        </Grid.Row>
      </Grid>
    </NavCategoriesWrapper>
  )
}

NavCategories.propTypes = {

}

export default NavCategories
