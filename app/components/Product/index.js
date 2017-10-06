/**
*
* Product
*
*/

import React, { PropTypes } from 'react'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Image, Label, Button } from 'semantic-ui-react'

import ProductSlider from 'components/BannerSlider'
import ListCollapse from 'components/ListCollapse'

import { calculateProductPrice } from 'utils/promo'
import { fbShare } from 'utils/fb-share'

import {LoadingStateInfo} from 'components/LoadingBlock'

import messages from './messages'

import DeliveryIcon from 'images/test-images/v2/delivery-icon.svg'
import ReturnIcon from 'images/test-images/v2/return-icon.svg'

import {
  ButtonContainer,
  DetailsWrapper,
  ProductDetails,
  ProductMainContent,
  ProductPriceWrapper,
  ProductWrapper,
  SocialContainer,
  ShareWrapper,
  ProductImageSlider,
  CollapseContent
} from './styled'

const Product = ({
  product,
  loading,
  popup,
  toggle,
  toggleClick,
  defaultImage,
  copied,
  productSlider,
  productPageTrigger,
  windowWidth }) => {
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const {
    TwitterShareButton
  } = ShareButtons
  const productImages = [product.get('image')]

  return (
    <div>
      <ProductWrapper className='mobile-visibility'>
        <Image className='brand-logo' alt='Cliqq' src={product.get('brandLogo')} />
        <ProductImageSlider>
          <ProductSlider
            images={productImages}
            loader={loading}
            isLowerdots />
        </ProductImageSlider>
        <ProductMainContent>
          <LoadingStateInfo loading={loading} center>
            <Label className='no-margin-bottom' as='p' basic size='big'>Brand Name</Label>
            <Label as='p' basic size='big'>All Day Backpack | Wine</Label>
            <ProductPriceWrapper>
              <Label className='product-price' as='b' basic size='massive' color='orange'>
                <FormattedMessage {...messages.peso} />
                { calculateProductPrice(product) }
              </Label>
              <Label className='product-discount' as='span' basic size='huge'>
                {
                  !isEmpty(product.get('discount'))
                  ? <FormattedMessage {...messages.peso} />
                  : ''
                }
                {
                  !isEmpty(product.get('discount')) &&
                  parseFloat(product.get('price')).toLocaleString()
                }
              </Label>
            </ProductPriceWrapper>
          </LoadingStateInfo>
        </ProductMainContent>

        <SocialContainer>
          <ShareWrapper>
            <p className='share-item ui big basic label'>Share Item:</p>

            <button className='unstyle-button share-button' onClick={() => fbShare(product)}>
              <FacebookIcon round size={30} />
            </button>

            <TwitterShareButton
              className='share-button'
              title={product.get('title')}
              via='711philippines'
              url={window.location.href} >
              <TwitterIcon size={30} round />
            </TwitterShareButton>
          </ShareWrapper>
        </SocialContainer>

        <DetailsWrapper>
          <ProductDetails>
            <Label as='p' basic size='big'> <FormattedMessage {...messages.productDetailsTitle} /> </Label>
            <LoadingStateInfo loading={loading}>
              <div className='product-details' dangerouslySetInnerHTML={{__html: product.get('details')}} />
            </LoadingStateInfo>
          </ProductDetails>
          <ListCollapse title='Delivery & Returns Policy'>
            <CollapseContent>
              <Image src={DeliveryIcon} alt='Cliqq' />
              <div className='collapse-description'>
                <Label className='description-title' as='p' basic size='large'>Free In-Store Delivery</Label>
                <Label as='p' color='grey' basic size='medium'>
                  Mega Manila: 1-3 Days <br />
                  Major Luzon Provinces: 3-5 Days <br />
                  Vis-Min Provinces: 7-14 Days
                </Label>
              </div>
            </CollapseContent>
            <CollapseContent>
              <Image src={ReturnIcon} alt='Cliqq' />
              <div className='collapse-description'>
                <Label className='description-title' as='p' basic size='large'>Cliqq Return Policy</Label>
                <Label as='p' color='grey' basic size='medium'>Not satisfied with your purchase? Depending on CLIQQ Care Policy, you can return your item anytime of the day <u>within 7 days</u> from claim date. Just go to your nearest 7/11 store where the item was purchased and get your Return Slip from the CLIQQ Kiosk and bring it to the cashier.</Label>
              </div>
            </CollapseContent>
          </ListCollapse>
          <ListCollapse title='Care Label'>
            <Label as='p' color='grey' basic size='medium'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos repudiandae inventore debitis iusto ea esse eligendi voluptatum distinctio assumenda quam aliquid, unde ullam odit tenetur cum, explicabo quisquam a!</Label>
          </ListCollapse>

          <ButtonContainer>
            <Button
              onClick={popup}
              loading={loading}
              primary
              fluid > <FormattedMessage {...messages.orderNow} /> </Button>
          </ButtonContainer>
        </DetailsWrapper>
      </ProductWrapper>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Product
