/**
*
* Product
*
*/

import React, { PropTypes } from 'react'

import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import {
  Image
} from 'semantic-ui-react'

import Test0001 from 'images/test-images/BACKPACK-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import ShareIconImage from 'images/icons/share-icon.svg'

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
  ShareIcon,
  DetailsWrapper,
  ProductDetails,
  ShippingDetails,
  DetailsTitle,
  DetailsDescription,
  ButtonContainer
} from './styled'

/**
 * Main calculation for getting the total price
 * @param {*} price
 * @param {*} discount
 */
const getTotalPrice = (price = 0, discount = 0) => {
  return price - (price * (discount / 100))
}

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const identifyCalculation = cases => dafultFn => key =>
 key in cases ? cases[key] : dafultFn

 /**
  * Gettting amount percentage
  * @param {*} product
  */
const calculatePercentage = (product) =>
  getTotalPrice(
    parseFloat(product.get('price')),
    parseFloat(product.getIn(['discount', 'value']))
  )

/**
  * Gettting amount amount
  * @param {*} product
  */
const calculateAmount = (product) =>
    parseFloat(product.get('price')) - parseFloat(product.getIn(['discount', 'value']))

/**
 * Main component for getting the price
 * @param {*} param0
 */
const calculateProductPrice = (product) => {
  if (isEmpty(product.get('discount'))) {
    return (parseFloat(product.get('price')).toLocaleString())
  }

  return identifyCalculation({
    PERCENTAGE: calculatePercentage,
    AMOUNT: calculateAmount
  })(calculatePercentage)(product.getIn(['discount', 'percentType']))(product)
}

const Product = ({ product, loading }) => {
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
              PHP { calculateProductPrice(product) }
            </ProductPrice>
            {
              !isEmpty(product.get('discount')) &&
              <ProductPriceStrike>PHP {product.get('price')}</ProductPriceStrike>
            }
          </ProductPriceWrapper>
        </LoadingStateInfo>
      </ProductMainContent>
      <ShareItemWrapper>
        <ShareIcon src={ShareIconImage} /> SHARE ITEM
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
