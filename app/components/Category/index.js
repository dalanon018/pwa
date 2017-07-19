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
  categories
}) {
  return (
    <Grid.Row>
      {
          loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
          : categories &&
          categories.valueSeq().map((category, index) => {
            return (
              <Grid.Column key={index} className='padding__none' mobile={4} tablet={4} computer={3} widescreen={3}>
                <CategoryBlock className='responsive-width' background={CategoryBgSample}>
                  <CategoryItem>
                    <Image src={sampleCategoryIcon} />
                    <CategoryLabel>{category.get('name')}</CategoryLabel>
                  </CategoryItem>
                </CategoryBlock>
              </Grid.Column>
            )
          })
        }
    </Grid.Row>
  )
}

const DefaultState = () => {
  return (
    <Grid.Column className='padding__none' mobile={4} tablet={4} computer={3} widescreen={3}>
      <EmptyDataBlock>
        <CategoryBlock className='responsive-width' background={EmptyImage} />
      </EmptyDataBlock>
    </Grid.Column>
  )
}

Category.propTypes = {

}

export default Category
