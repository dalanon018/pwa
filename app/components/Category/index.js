/**
*
* Category
*
*/

import React from 'react'
// import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import EmptyDataBlock from 'components/EmptyDataBlock'

import { Grid, Image } from 'semantic-ui-react'
import sampleCategoryIcon from 'images/test-images/accessories-icon.svg'
import CategoryBgSample from 'images/test-images/accessories.jpg'
import EmptyImage from 'images/broken-image.jpg'

import {
  range
} from 'lodash'

import {
  CategoryBlock,
  CategoryItem,
  CategoryLabel } from './styles'

function Category ({
  loader,
  categories,
  grids,
  height,
  margin,
  iconWidth,
  fontSize
}) {
  const { mobile, tablet, computer, widescreen } = grids
  return (
    <Grid.Row>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} height={height} margin={margin} grids={grids} />)
        : categories &&
        categories.valueSeq().map((category, index) => {
          return (
            <Grid.Column key={index} className='padding__none--horizontal' mobile={mobile} tablet={tablet} computer={computer} widescreen={widescreen}>
              <CategoryBlock className='responsive-width' height={height} background={CategoryBgSample} margin={margin} width={iconWidth}>
                <CategoryItem>
                  <Image src={sampleCategoryIcon} />
                  <CategoryLabel fontSize={fontSize}>{category.get('name')}</CategoryLabel>
                </CategoryItem>
              </CategoryBlock>
            </Grid.Column>
          )
        })
      }
    </Grid.Row>
  )
}

const DefaultState = ({
  height,
  margin,
  grids
}) => {
  const { mobile, tablet, computer, widescreen } = grids
  return (
    <Grid.Column className='padding__none--horizontal' mobile={mobile} tablet={tablet} computer={computer} widescreen={widescreen}>
      <EmptyDataBlock>
        <CategoryBlock className='responsive-width' height={height} margin={margin} background={EmptyImage} />
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Category.propTypes = {

}

export default Category
