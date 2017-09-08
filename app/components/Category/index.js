/**
*
* Category
*
*/

import React, { PropTypes } from 'react'

import EmptyDataBlock from 'components/EmptyDataBlock'

import { Grid, Image } from 'semantic-ui-react'

import defaultCategoryBackground from 'images/default-categories.jpg'

import { imageStock, paramsImgix } from 'utils/image-stock'

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
  const imgixOptions = {
    auto: 'format',
    q: 75,
    lossless: 0
  }

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
                <Image alt='Cliqq' className='category-image' src={category.get('background') ? paramsImgix(category.get('background'), imgixOptions) : defaultCategoryBackground} />
                <CategoryContent>
                  <CategoryItem width={iconWidth}>
                    <Image alt='Cliqq' src={category.get('main') ? paramsImgix(category.get('main'), imgixOptions) : imageStock('default-image.png')} />
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
          <Image alt='Cliqq' className='category-image' src={imageStock('broken-image.jpg')} />
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
