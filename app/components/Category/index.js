/**
*
* Category
*
*/

import React, { PropTypes } from 'react'
import EmptyDataBlock from 'components/EmptyDataBlock'
import { Grid, Label } from 'semantic-ui-react'
import defaultCategoryBackground from 'images/default-categories.jpg'
import { imageStock, paramsImgix } from 'utils/image-stock'

import {
  range
} from 'lodash'

// import {
//   CategoryBlock,
//   CategoryContent,
//   CategoryItem,
//   CategoryLabel } from './styles'

import {
  CategoryBlock,
  BackgroundLay
} from './styles'

const imgixOptions = {
  auto: 'compress',
  q: 35,
  lossless: 0
}

function Category ({
  loader,
  categories,
  windowWidth,
  margin,
  iconWidth,
  changeRoute,
  route,
  fontSize
}) {
  return (
    <Grid padded columns='1'>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} margin={margin} />)
        : categories &&
        categories.valueSeq().map((category, index) => {
          const handleRedirect = () => changeRoute(`/products-category/${category.get('id')}`)

          return (
            <Grid.Column key={index}>
              <CategoryBlock
                onClick={handleRedirect}
                background={category.get('background') ? category.get('background') : defaultCategoryBackground}>
                <BackgroundLay />
                <Label as='span' basic size='massive'>{category.get('name')}</Label>
              </CategoryBlock>
            </Grid.Column>
          )
        }).slice(0, 4)
      }
    </Grid>
  )
}

const DefaultState = () => {
  return (
    <Grid.Column>
      <EmptyDataBlock>
        <CategoryBlock background={paramsImgix(imageStock('broken-image.jpg'), imgixOptions)} />
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Category.propTypes = {
  categories: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired

}

export default Category
