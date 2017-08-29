/**
*
* Category
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import EmptyDataBlock from 'components/EmptyDataBlock'

import { Grid, Image } from 'semantic-ui-react'
import EmptyImage from 'images/broken-image.jpg'
import defaultImage from 'images/default-image.png'
import defaultCategoryBackground from 'images/default-categories.jpg'

import {
  range
} from 'lodash'

import {
  CategoryBlock,
  CategoryContent,
  CategoryItem,
  CategoryLabel } from './styles'

function Category ({
  loader,
  categories,
  resposiveColumns,
  windowWidth,
  margin,
  iconWidth,
  changeRoute,
  route,
  fontSize
}) {
  return (
    <Grid.Row columns={resposiveColumns}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} margin={margin} />)
        : categories &&
        categories.valueSeq().map((category, index) => {
          const handleRedirect = () => changeRoute(`/products-category/${category.get('id')}`)

          return (
            <Grid.Column
              key={index}
              className='padding__none--horizontal category-item' >
              <CategoryBlock margin={margin} width={iconWidth} onClick={handleRedirect}>
                <Image className='category-image' src={category.get('background') ? category.get('background') : defaultCategoryBackground} />
                <CategoryContent>
                  <CategoryItem width={iconWidth}>
                    <Image src={category.get('main') ? category.get('main') : defaultImage} />
                    <CategoryLabel fontSize={fontSize}>{category.get('name')}</CategoryLabel>
                  </CategoryItem>
                </CategoryContent>
              </CategoryBlock>
            </Grid.Column>
          )
        })
      }
    </Grid.Row>
  )
}

const DefaultState = ({
  margin
}) => {
  return (
    <Grid.Column className='padding__none--horizontal category-item'>
      <EmptyDataBlock>
        <CategoryBlock margin={margin} className='responsive-width'>
          <Image className='category-image' src={EmptyImage} />
        </CategoryBlock>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Category.propTypes = {
  categories: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired

}

export default Category
