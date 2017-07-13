/**
*
* NavCategories
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'
import { NavCategoriesWrapper } from './styles'
import { Grid, Image } from 'semantic-ui-react'

import sampleIconImage from 'images/test-images/mobile-cursor.png'

function NavCategories () {
  return (
    <NavCategoriesWrapper>
      <Grid textAlign='center'>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <Image src={sampleIconImage} />
            <span>APPAREL</span>
          </Grid.Column>
          <Grid.Column>
            <Image src={sampleIconImage} />
            <span>ACCESSORIES</span>
          </Grid.Column>
          <Grid.Column>
            <Image src={sampleIconImage} />
            <span>FRAGRANCES</span>
          </Grid.Column>
          <Grid.Column>
            <Image src={sampleIconImage} />
            <span>GADGETS</span>
          </Grid.Column>
          <Grid.Column>
            <Image src={sampleIconImage} />
            <span>MORE</span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </NavCategoriesWrapper>
  )
}

NavCategories.propTypes = {

}

export default NavCategories
