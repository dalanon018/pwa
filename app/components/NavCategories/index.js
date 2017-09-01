/**
*
* NavCategories
*
*/

import React from 'react'
import { range } from 'lodash'
import { imageStock } from 'utils/image-stock'

import { Grid } from 'semantic-ui-react'

import {
  NavCategoriesWrapper,
  NavCategoriesContainer,
  CategoryItem,
  DefaultIcon,
  DefaultName,
  CategoryIcon
} from './styles'

import defaultImage from 'images/icons/default-nav-category.png'
import moreIcon from 'images/icons/more-icon.svg'

const CategoryBlock = ({
  index,
  handleRedirect,
  handleRoute,
  categories
}) => {
  return (
    <NavCategoriesContainer>
      {
        categories &&
        categories.valueSeq().map((category, index) => {
          return (
            <CategoryItem key={index} onClick={(id) => handleRedirect(category.get('id'))}>
              <CategoryIcon background={category.get('icon') ? category.get('icon') : defaultImage} />
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
  )
}

const CategoryLoader = () => {
  return (
    <NavCategoriesContainer>
      {
        range(5).map((_, index) => {
          return (
            <CategoryItem key={index}>
              <DefaultIcon background={imageStock('broken-image.jpg')} />
              <DefaultName />
            </CategoryItem>
          )
        }
      )}
    </NavCategoriesContainer>
  )
}

function NavCategories ({
  categories,
  changeRoute,
  categoryLoader
}) {
  const handleRoute = () => {
    changeRoute('/categories')
  }
  const handleRedirect = (id) => changeRoute(`/products-category/${id}`)
  return (
    <NavCategoriesWrapper className='mobile-visibility'>
      <Grid padded textAlign='center'>
        <Grid.Row columns={5}>
          {
            categoryLoader
            ? <CategoryLoader />
            : <CategoryBlock
              handleRoute={handleRoute}
              handleRedirect={handleRedirect}
              categories={categories} />
          }
        </Grid.Row>
      </Grid>
    </NavCategoriesWrapper>
  )
}

NavCategories.propTypes = {

}

export default NavCategories
