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
  CategoryContent,
  CategoryItem,
  CategoryLabel } from './styles'

function Category ({
  loader,
  categories,
  grids,
  margin,
  iconWidth,
  changeRoute,
  route,
  fontSize
}) {
  const { mobile, tablet, computer, widescreen } = grids
  const handleRedirect = () => {
    changeRoute(route)
  }
  return (
    <Grid.Row>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} margin={margin} grids={grids} />)
        : categories &&
        categories.valueSeq().map((category, index) => {
          return (
            <Grid.Column key={index} className='padding__none--horizontal category-divider' mobile={mobile} tablet={tablet} computer={computer} widescreen={widescreen}>
              <CategoryBlock margin={margin} width={iconWidth} onClick={handleRedirect}>
                <Image className='category-image' src={CategoryBgSample} />
                <CategoryContent>
                  <CategoryItem width={iconWidth}>
                    <Image src={sampleCategoryIcon} />
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
  margin,
  grids
}) => {
  const { mobile, tablet, computer, widescreen } = grids
  return (
    <Grid.Column className='padding__none--horizontal' mobile={mobile} tablet={tablet} computer={computer} widescreen={widescreen}>
      <EmptyDataBlock>
        <CategoryBlock margin={margin} className='responsive-width'>
          <Image className='category-image' src={EmptyImage} />
        </CategoryBlock>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Category.propTypes = {

}

export default Category
