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
import moreIcon from 'images/icons/more-icon.svg'

function NavCategories ({
  categories,
  changeRoute
}) {
  const handleRoute = () => {
    changeRoute('/categories')
  }
  return (
    <NavCategoriesWrapper className='mobile-visibility'>
      <Grid padded textAlign='center'>
        <Grid.Row columns={5}>
          <NavCategoriesContainer>
            {
              categories &&
              categories.valueSeq().map((category, index) => {
                const handleRedirect = () => changeRoute(`/products-category/${category.get('id')}`)
                return (
                  <CategoryItem key={index} onClick={handleRedirect}>
                    <CategoryIcon background={sampleCategoryIcon} />
                    <p>{category.get('name')}</p>
                  </CategoryItem>
                )
              }).splice(4)
            }
            <CategoryItem onClick={handleRoute}>
              <CategoryIcon background={moreIcon} />
              <p>More</p>
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
