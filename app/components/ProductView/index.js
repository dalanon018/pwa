/**
*
* ProductView
*
*/

import React from 'react'
import {
  range,
  isEmpty
} from 'lodash'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Grid, Image } from 'semantic-ui-react'

import {
  CustomGridRow,
  ImageWrapper,
  ProductName,
  ProductPrice,
  ProductPriceStrike,
  ProductPriceWrapper,
  ProductWrapper
} from './styles'

import EmptyDataBlock from 'components/EmptyDataBlock'

import PromoTag from './sections/PromoTag'
import ProductImage from 'images/test-images/samplebag.png'
import EmptyImage from 'images/broken-image.jpg'
import ParagraphImage from 'images/test-images/short-paragraph.png'

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
  if (product.get('discount').size === 0) {
    return (parseFloat(product.get('price')).toLocaleString())
  }

  return identifyCalculation({
    PERCENTAGE: calculatePercentage,
    AMOUNT: calculateAmount
  })(calculatePercentage)(product.getIn(['discount', 'discountType']))(product)
}

function ProductView ({
  loader,
  products,
  changeRoute
}) {
  return (
    <CustomGridRow stretched columns={2}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
        : products.valueSeq().map((product) => {
          return (
            <Grid.Column key={product.get('cliqqCode')} className='padding__none--horizontal' mobile={8} tablet={4} computer={3} widescreen={3} onClick={() => changeRoute(`/product/${product.get('cliqqCode').first()}`)}>
              <ProductWrapper>
                {
                  !isEmpty(product.get('discount')) &&
                  <PromoTag discount={product.get('discount')} />
                }
                <ImageWrapper>
                  <Image src={ProductImage} />
                </ImageWrapper>
                <ProductName>{product.get('title')}</ProductName>
                <ProductPriceWrapper>
                  <ProductPrice>
                    <FormattedMessage {...messages.peso} />
                    { calculateProductPrice(product) }
                  </ProductPrice>
                  <ProductPriceStrike>
                    <FormattedMessage {...messages.peso} />
                    {
                      !isEmpty(product.get('discount')) &&
                      parseFloat(product.get('price')).toLocaleString()
                    }
                  </ProductPriceStrike>
                </ProductPriceWrapper>
              </ProductWrapper>
            </Grid.Column>
          )
        })
      }
    </CustomGridRow>
  )
}

const DefaultState = () => {
  return (
    <Grid.Column className='padding__none--horizontal' mobile={8} tablet={4} computer={3} widescreen={3}>
      <EmptyDataBlock>
        <ProductWrapper>
          <ImageWrapper background={EmptyImage} className='custom-height' />
          <Image src={ParagraphImage} height={50} />
        </ProductWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

ProductView.propTypes = {

}

export default ProductView
