/**
*
* Product
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import {
  identity,
  ifElse
} from 'ramda'

import { FormattedMessage } from 'react-intl'
import { Image, Label, Button, Icon } from 'semantic-ui-react'

import DeliveryIcon from 'images/test-images/v2/delivery-icon.svg'
import ReturnIcon from 'images/test-images/v2/return-icon.svg'

import { fbShare } from 'utils/fb-share'
import { paramsImgix } from 'utils/image-stock'
import { calculateEarnPoints } from 'utils/calculation'

import ProductSlider from 'components/Shared/BannerSlider'
import ListCollapse from 'components/Shared/ListCollapse'
import PromptModal from 'components/Shared/PromptModal'

import { LoadingStateInfo } from 'components/Shared/LoadingBlock'

import messages from './messages'
import SizeSelector from './SizeSelector'

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

const showDiscountPrice = (component1, component2) => (condition) => ifElse(
  identity,
  () => component1,
  () => component2
)(condition)

const updateParamsImages = (images, opt = {}) => {
  const options = {
    w: 414,
    h: 246,
    fit: 'fill',
    auto: 'compress',
    q: 35,
    lossless: 0,
    ...opt
  }

  return images ? paramsImgix(images, options) : ''
}

const Product = ({
  product,
  loading,
  onSubmit,
  toggle,
  changeRoute,
  toggleClick,
  openEmailPrompt,
  closeEmailPrompt,
  defaultImage,
  intl,
  origPrice,
  isMobile,
  copied,
  productSlider,
  togglePrompt,
  productPageTrigger,
  windowWidth,
  onSizeChange
}) => {
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const {
    TwitterShareButton
  } = ShareButtons
  const productSliders = product.get('sliders') ? product.get('sliders').toArray().map(updateParamsImages) : []
  // we need to add our main image to sliders
  const productImages = [updateParamsImages(product.get('image'))].concat(productSliders)
  const brandLogo = product.get('brandLogo') ? (
    <Image
      className='brand-logo'
      alt='CLiQQ'
      src={updateParamsImages(product.get('brandLogo'), { w: 200, h: 30 })}
      onClick={changeRoute.bind(this, `/brands/${product.getIn(['brand', 'code'])}`)} />) : ''

  const toggleDiscount = showDiscountPrice(
    <Label className='product-discount' as='span' basic size='huge' color='grey'>
      <FormattedMessage {...messages.peso} />
      { product.get('price') &&
        parseFloat(product.get('price')).toLocaleString() }
    </Label>,
    null
  )

  const _handleMailTo = () => {
    if (!isMobile) {
      openEmailPrompt()
    } else {
      window.location.href = `mailto:?subject=₱${origPrice(product)} ${product.get('title')}&body=Click this link to see the product: ${window.location.href}`
    }
  }

  const fbShareAction = () => {
    return fbShare(product)
  }

  const getHighestPointsEarn = () => {
    const amount = product.get('discountPrice') || product.get('price')

    return `${calculateEarnPoints({
      multiplier: parseFloat(product.getIn(['points', 'multiplier'])),
      percentage: parseFloat(product.getIn(['points', 'methods', 'cash'])),
      amount: parseFloat(amount)
    })} CLiQQ Points`
  }

  return (
    <div>
      <ProductWrapper>

        { loading || brandLogo }
        <ProductImageSlider className='border_bottom__one--light-grey'>
          <ProductSlider
            images={productImages}
            loader={loading}
            isInfinite
            isLowerdots
          />
          {
            +product.get('quantity') === 0 &&
            <Label className='text__align--center' as='p' basic size='huge' color='red'>
              <FormattedMessage {...messages.noStock} />
            </Label>
          }
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
                { origPrice(product) }
              </Label>
              { toggleDiscount(product.get('discountPrice')) }
            </ProductPriceWrapper>
          </LoadingStateInfo>
        </ProductMainContent>

        {
          product.get('association') &&
          <SizeSelector
            product={product}
            onSizeChange={onSizeChange}
          />
        }

        {
          product.get('points') && <FormattedMessage
            {...messages.earnPoints}
            values={{points: <b>{getHighestPointsEarn()}</b>}} />
        }

        <SocialContainer className='border_bottom__one--light-grey border_top__one--light-grey'>
          <ShareWrapper>
            <p className='share-item ui big basic label color__secondary'><FormattedMessage {...messages.shareItem} /></p>

            <button className='unstyle-button share-button' onClick={fbShareAction}>
              <FacebookIcon round size={30} />
            </button>

            <TwitterShareButton
              className='share-button'
              title={product.get('title')}
              via='711philippines'
              url={window.location.href} >
              <TwitterIcon size={30} round />
            </TwitterShareButton>

            <a onClick={_handleMailTo} className='share-button'>
              <Icon circular inverted name='mail' color='orange' />
            </a>
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
              <Image src={DeliveryIcon} alt='CLiQQ' />
              <div className='collapse-description'>
                <Label className='description-title color__secondary' as='p' basic size='large'><FormattedMessage {...messages.deliveryTitle} /></Label>
                <Label className='text__roboto--light color__dark-grey' as='p' basic size='medium'>
                  <span dangerouslySetInnerHTML={{__html: product.get('deliveryPromiseMessage')}} />
                </Label>
              </div>
            </CollapseContent>
            <CollapseContent>
              <Image src={ReturnIcon} alt='CLiQQ' />
              <div className='collapse-description'>
                <Label className='description-title primary__secondary' as='p' basic size='large'><FormattedMessage {...messages.returnPolicy} /></Label>
                <Label className='text__roboto--light color__dark-grey' as='p' basic size='medium'>
                  <span dangerouslySetInnerHTML={{__html: product.get('returnPolicy')}} />
                </Label>
              </div>
            </CollapseContent>
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
              onClick={onSubmit}
              loading={loading}
              primary
              disabled={+product.get('quantity') === 0}
              fluid > <FormattedMessage {...messages.orderNow} /> </Button>
          </ButtonContainer>
        </DetailsWrapper>
      </ProductWrapper>
      <PromptModal
        title={intl.formatMessage(messages.emailWarningTitle)}
        name='warning'
        content={intl.formatMessage(messages.emailWarningDescription)}
        open={togglePrompt}
        close={closeEmailPrompt}
      />
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  origPrice: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default Product
