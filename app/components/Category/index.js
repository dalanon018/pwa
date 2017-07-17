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
  CategoryBlock,
  CategoryItem,
  CategoryLabel } from './styles'

function Category ({loader}) {
  return (
    <Grid.Row columns={4}>
      <Grid.Column className='padding__none' mobile={4} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <CategoryBlock className='responsive-width' background={CategoryBgSample}>
            <CategoryItem>
              <Image src={sampleCategoryIcon} />
              <CategoryLabel>CATEGORY</CategoryLabel>
            </CategoryItem>
          </CategoryBlock>
        }
      </Grid.Column>

      <Grid.Column className='padding__none' mobile={4} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <CategoryBlock className='responsive-width' background={CategoryBgSample}>
            <CategoryItem>
              <Image src={sampleCategoryIcon} />
              <CategoryLabel>CATEGORY</CategoryLabel>
            </CategoryItem>
          </CategoryBlock>
        }
      </Grid.Column>

      <Grid.Column className='padding__none' mobile={4} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <CategoryBlock className='responsive-width' background={CategoryBgSample}>
            <CategoryItem>
              <Image src={sampleCategoryIcon} />
              <CategoryLabel>CATEGORY</CategoryLabel>
            </CategoryItem>
          </CategoryBlock>
        }
      </Grid.Column>

      <Grid.Column className='padding__none' mobile={4} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <CategoryBlock className='responsive-width' background={CategoryBgSample}>
            <CategoryItem>
              <Image src={sampleCategoryIcon} />
              <CategoryLabel>CATEGORY</CategoryLabel>
            </CategoryItem>
          </CategoryBlock>
        }
      </Grid.Column>
    </Grid.Row>
  )
}

const DefaultState = () => {
  return (
    <EmptyDataBlock>
      <CategoryBlock className='responsive-width' background={EmptyImage} />
    </EmptyDataBlock>
  )
}

Category.propTypes = {

}

export default Category
