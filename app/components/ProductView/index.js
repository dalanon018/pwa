/**
*
* ProductView
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Grid, Image, Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

// test image
import TestImage from 'images/test-images/v2/Backpack.png'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LabelBorderNone = styled(Label)`
  border: none !important
`

const View = ({ product }) => {
  return (
    <Grid.Column>
      <Wrapper>
        <Image alt={product.get('title')} src={TestImage} size='small' />
        <LabelBorderNone basic size='medium'>
          { product.get('brand') }
        </LabelBorderNone>
        <LabelBorderNone basic size='mini'>
          { product.get('title') }
        </LabelBorderNone>
        <LabelBorderNone basic size='massive' color='orange'>
          <FormattedMessage {...messages.peso} />
          { product.get('price') }
        </LabelBorderNone>
      </Wrapper>
    </Grid.Column>
  )
}

function ProductView ({ products }) {
  return (
    <Grid container padded columns='2'>
      {
        products.map((product, idx) =>
          <View product={product} key={idx} />
        )
      }
    </Grid>
  )
}

ProductView.propTypes = {
  products: PropTypes.object.isRequired
}

export default ProductView
