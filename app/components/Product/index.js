/**
*
* Product
*
*/

import React, { PropTypes } from 'react'

import { FormattedMessage } from 'react-intl'
import {
  Image
} from 'semantic-ui-react'

import Test0001 from 'images/test-images/BACKPACK-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'

import Button from 'components/Button'
import H3 from 'components/H3'

import {
  LoadingStateImage,
  LoadingStateInfo
} from 'components/LoadingBlock'

import messages from './messages'
import {
  ProductWrapper,
  ImageBanner,
  ProductMainContent,
  HeaderWrapper,
  CodeImage,
  ProductPriceWrapper,
  ProductPriceTitle,
  ProductPrice,
  ProductPriceStrike,
  ShareItemWrapper,
  DetailsWrapper,
  ProductDetails,
  ShippingDetails,
  DetailsTitle,
  DetailsDescription,
  ButtonContainer
} from './styled'

const Product = ({ product, loading }) => {
  const getTotalPrice = (price = 0, discount = 0) => {
    return price - (price * (discount / 100))
  }

  return (
    <ProductWrapper>
      <ImageBanner>
        <LoadingStateImage loading={loading}>
          <Image src={Test0001} />
        </LoadingStateImage>
      </ImageBanner>
      <ProductMainContent>
        <LoadingStateInfo loading={loading} center>
          <HeaderWrapper>
            <CodeImage src={CliqqLogo} /> { product.get('product_id') }
          </HeaderWrapper>
          <H3 weight='300' letterSpacing='4px' uppercase> { product.get('title') } </H3>
          <ProductPriceWrapper>
            <ProductPriceTitle> <FormattedMessage {...messages.productPriceTitle} /> </ProductPriceTitle>
            <ProductPrice>
              PHP { getTotalPrice(product.get('price'), product.getIn(['discount', 'percent'])) }
            </ProductPrice>
            {
              product.getIn(['discount', 'percent']) && <ProductPriceStrike>PHP {product.get('price')}</ProductPriceStrike>
            }
          </ProductPriceWrapper>
        </LoadingStateInfo>
      </ProductMainContent>
      <ShareItemWrapper>
        SHARE ITEM
      </ShareItemWrapper>
      <DetailsWrapper>
        <ProductDetails>
          <DetailsTitle> <FormattedMessage {...messages.productDetailsTitle} /> </DetailsTitle>
          <LoadingStateInfo loading={loading}>
            <DetailsDescription>
              { product.get('details') }
            </DetailsDescription>
          </LoadingStateInfo>
        </ProductDetails>
        <ShippingDetails>
          <DetailsTitle> <FormattedMessage {...messages.productDeliveryTitle} /> </DetailsTitle>
          <LoadingStateInfo loading={loading}>
            <DetailsDescription>
              { product.get('shipping') }
            </DetailsDescription>
          </LoadingStateInfo>
        </ShippingDetails>
        <ButtonContainer>
          <Button
            onClick={() => {}}
            primary
            fluid
            loading={loading}
          > <FormattedMessage {...messages.orderNow} /> </Button>
        </ButtonContainer>
      </DetailsWrapper>
    </ProductWrapper>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Product
