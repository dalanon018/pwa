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

import {
  identity,
  ifElse
} from 'ramda'

import { FormattedMessage } from 'react-intl'
import { Image, Label, Button } from 'semantic-ui-react'

import ProductSlider from 'components/BannerSlider'
import ListCollapse from 'components/ListCollapse'

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
  changeRoute,
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
  const productSliders = product.get('sliders') ? product.get('sliders').toArray() : []
  const productImages = [product.get('image')].concat(productSliders)
  const brandLogo = product.get('brandLogo') ? (
    <Image
      className='brand-logo'
      alt='Cliqq'
      src={product.get('brandLogo')}
      onClick={changeRoute.bind(this, `/brands/${product.getIn(['brand', 'code'])}`)} />) : ''
  const toggleOrigDiscountPrice = (product) => {
    return product.get('discountPrice') || product.get('price')
  }
  const showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)
  const toggleDiscount = showDiscountPrice(
    <Label className='product-discount' as='span' basic size='huge' color='grey'>
      <FormattedMessage {...messages.peso} />
      { product.get('price') &&
        parseFloat(product.get('price')).toLocaleString() }
    </Label>,
    null
  )

  return (
    <div>
      <ProductWrapper>

        { loading || brandLogo }
        <ProductImageSlider className='border_bottom__one--light-grey'>
          <ProductSlider
            images={productImages}
            loader={loading}
            isLowerdots />
        </ProductImageSlider>
        <ProductMainContent>
          <LoadingStateInfo loading={loading} center>
            {
              product.get('brand')
              ? <Label className='no-margin-bottom color__secondary' as='p' basic size='big'>{product.getIn(['brand', 'name'])}</Label>
              : null
            }
            <Label as='p' basic size='big'>{product.get('title')}</Label>
            <ProductPriceWrapper>
              <Label className='product-price' as='b' basic size='massive' color='orange'>
                <FormattedMessage {...messages.peso} />
                { toggleOrigDiscountPrice(product) }
              </Label>
              { toggleDiscount(product.get('discountPrice') !== 0) }
            </ProductPriceWrapper>
          </LoadingStateInfo>
        </ProductMainContent>

        <SocialContainer className='border_bottom__one--light-grey border_top__one--light-grey'>
          <ShareWrapper>
            <p className='share-item ui big basic label color__secondary'><FormattedMessage {...messages.shareItem} /></p>

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
          <ProductDetails className='border_bottom__one--light-grey'>
            <Label as='p' basic size='big' className='color__secondary'> <FormattedMessage {...messages.productDetailsTitle} /> </Label>
            <LoadingStateInfo loading={loading} className='color__light-grey' >
              <div className='product-details text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: product.get('details')}} />
            </LoadingStateInfo>
          </ProductDetails>
          <ListCollapse title={
            <Label as='p' className='margin__none color__secondary' size='large' >
              <FormattedMessage {...messages.deliveryReturnsPolicy} />
            </Label>
          }>
            <CollapseContent>
              <Image src={DeliveryIcon} alt='Cliqq' />
              <div className='collapse-description'>
                <Label className='description-title color__secondary' as='p' basic size='large'><FormattedMessage {...messages.deliveryTitle} /></Label>
                <Label className='text__roboto--light color__dark-grey' as='p' basic size='medium'>
                  <span dangerouslySetInnerHTML={{__html: product.get('deliveryPromiseMessage')}} />
                </Label>
              </div>
            </CollapseContent>
            {
                product && product.get('returnable')
                ? (
                  <CollapseContent>
                    <Image src={ReturnIcon} alt='Cliqq' />
                    <div className='collapse-description'>
                      <Label className='description-title primary__secondary' as='p' basic size='large'><FormattedMessage {...messages.returnPolicy} /></Label>
                      <Label className='text__roboto--light color__dark-grey' as='p' basic size='medium'>
                        <span dangerouslySetInnerHTML={{__html: product.get('returnPolicy')}} />
                      </Label>
                    </div>
                  </CollapseContent>
                  )
                : null
              }
          </ListCollapse>
          {
            product.get('additionalDetails')
            ? <ListCollapse title={
              <Label as='p' className='margin__none' size='large' >
                <FormattedMessage {...messages.additionalInfo} />
              </Label>
            }>
              <CollapseContent>
                <Label as='p' color='grey' basic size='medium'>
                  <span dangerouslySetInnerHTML={{__html: product.get('additionalDetails')}} />
                </Label>
              </CollapseContent>
            </ListCollapse>
            : ''
          }

          <ButtonContainer className='background__white'>
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
