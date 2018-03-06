/**
*
* Category
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import { Grid, Label } from 'semantic-ui-react'

import EmptyDataBlock from 'components/Shared/EmptyDataBlock'

import { imageStock, paramsImgix } from 'utils/image-stock'

import {
  range
} from 'lodash'

import {
  BackgroundLay,
  CategoryBlock,
  CategoryWrapper
} from './styles'

const imgixOptions = {
  w: 374,
  h: 100,
  fit: 'clamp',
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
  const imageShow = (image) => image || paramsImgix(imageStock('Categories-Default.jpg'), imgixOptions)

  return (
    <CategoryWrapper>
      <Grid padded columns='1'>
        {
          loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} margin={margin} />)
          : categories &&
          categories.valueSeq().map((category, index) => {
            const handleRedirect = () => changeRoute(`/products-category/${category.get('id')}?name=${category.get('name')}`)

            return (
              <Grid.Column key={index}>
                <LazyLoad
                  height={100}
                  once
                >
                  <CategoryBlock
                    onClick={handleRedirect}
                    background={paramsImgix(imageShow(category.get('background')), imgixOptions)}>
                    <BackgroundLay className='background__black-transparent' />
                    <Label as='span' basic size='massive' className='color__white'>{category.get('name')}</Label>
                  </CategoryBlock>
                </LazyLoad>
              </Grid.Column>
            )
          }).slice(0, 4)
        }
      </Grid>
    </CategoryWrapper>
  )
}

export const DefaultState = () => {
  return (
    <Grid.Column>
      <EmptyDataBlock>
        <CategoryBlock background={paramsImgix(imageStock('Categories-Default.jpg'), imgixOptions)} />
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Category.propTypes = {
  categories: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired

}

export default Category
