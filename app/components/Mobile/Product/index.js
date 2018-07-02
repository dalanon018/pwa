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

import { FormattedMessage } from 'react-intl'
import { Image, Label, Button, Icon, Grid } from 'semantic-ui-react'

import TimerWrapper from 'components/Mobile/TimerWrapper'

import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'
import CliQQPlainLogo from 'images/icons/cliqq.png'
import MessengerIcon from 'images/icons/messenger-icon.svg'
import WhatsAppIcon from 'images/icons/whatsapp-icon.svg'
import ViberIcon from 'images/icons/viber-icon.svg'

import LightBox from 'components/Shared/LightBox'

import { fbShare, viberShare, whatsAppShare, fbMessengerShare } from 'simple-social-share'
import { paramsImgix } from 'utils/image-stock'
import { calculateEarnPoints } from 'utils/calculation'
import { toggleOrigDiscountPrice, computeTotalPointsPrice } from 'utils/product'
import { ToggleComponent } from 'utils/logicHelper'

import ProductSlider from 'components/Mobile/BannerSlider'
import ListCollapse from 'components/Shared/ListCollapse'
import PromptModal from 'components/Shared/PromptModal'

import { LoadingStateInfo } from 'components/Shared/LoadingBlock'
import {
  FB_SHARE_ID
} from 'containers/App/constants'

import messages from './messages'
import SizeSelector from './SizeSelector'

import {
  ButtonContainer,
  DetailsWrapper,
  ProductDetails,
  ProductMainContent,
  ProductPriceWrapper,
  FullPointsWrapper,
  ProductWrapper,
  SocialContainer,
  ShareWrapper,
  ProductImageSlider,
  CollapseContent,
  PointsInfo
} from './styled'

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

const getHighestPointsEarn = (product) => {
  const amount = product.get('discountPrice') || product.get('price')
  const method = product.getIn(['points', 'method', 'cash'])
  // ensure product and method is not empty
  return (product.size && method.size) && `${calculateEarnPoints({
    multiplier: product.getIn(['points', 'multiplier']),
    method: method.toObject(),
    amount: amount
  })} CLiQQ Points`
}

const DisplayProductPointsPrice = ({ entity }) => {
  return (
    <FullPointsWrapper>
      <Image src={CliQQPlainLogo} className='cliqq-plain-icon' alt='CLiQQ' />
      <Label as='b' basic size='big' className='product-price color__primary text__weight--700'>
        { computeTotalPointsPrice(entity) }
      </Label>
    </FullPointsWrapper>
  )
}

const DisplayProductPrice = ({ entity }) => {
  const toggleDiscount = ToggleComponent(
    <Label className='product-discount' as='span' basic size='huge' color='grey'>
      <FormattedMessage {...messages.peso} />
      { entity.get('price') &&
        parseFloat(entity.get('price')).toLocaleString() }
    </Label>,
    null
  )

  return (
    <ProductPriceWrapper>
      <Label className='product-price text__weight--700 color__primary' as='b' basic size='massive'>
        <FormattedMessage {...messages.peso} />
        { toggleOrigDiscountPrice(entity) }
      </Label>
      { toggleDiscount(entity.get('discountPrice')) }
    </ProductPriceWrapper>
  )
}

export const ToggleFullPoints = ({ isFullPointsOnly, ...rest }) => {
  return ToggleComponent(
    <DisplayProductPointsPrice {...rest} />,
    <DisplayProductPrice {...rest} />
  )(isFullPointsOnly)
}

export const ToggleEarnPoints = ({ entity, isFullPointsOnly, changeRoute }) => {
  return ToggleComponent(
    <PointsInfo>
      <Image src={CliQQPlainLogo} alt='CLiQQ' />
      <Label as='span' basic size='medium' className='text__weight--400'>
        <FormattedMessage
          {...messages.earnPoints}
          values={{
            points: <span className='color__primary'>{getHighestPointsEarn(entity)}</span>,
            termsConditions: <span className='color__primary' onClick={() => changeRoute('/terms-conditions')}><FormattedMessage {...messages.applyTermsConditions} /></span>
          }} />
      </Label>
    </PointsInfo>
  , null)(!isFullPointsOnly && !!entity.get('points'))
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
  isMobile,
  copied,
  productSlider,
  togglePrompt,
  productPageTrigger,
  windowWidth,
  onSizeChange,
  lightBoxImage,
  toggleLightBox,
  _isFullPointsOnly
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

  const _handleMailTo = () => {
    if (!isMobile) {
      openEmailPrompt()
    } else {
      window.location.href = `mailto:?subject=₱${toggleOrigDiscountPrice(product)} ${product.get('title')}&body=Click this link to see the product: ${window.location.href}`
    }
  }

  const fbShareAction = () => {
    const itemData = {
      title: product.get('title'),
      description: product.get('details'),
      image: product.get('image')
    }

    return fbShare(itemData, FB_SHARE_ID)
  }

  return (
    <div>
      <ProductWrapper>

        <div className='background__white box__shadow--primary'>
          { loading || brandLogo }
          <ProductImageSlider className='margin__top-positive--20'>
            <ProductSlider
              images={productImages}
              loader={loading}
              toggleLightBox={toggleLightBox}
              lightBoxImage={lightBoxImage}
              percentage={product.get('discountInfo') && product.get('discountInfo')}
              isInfinite
              curved
              isProductPage
            />
            {
              +product.get('quantity') === 0 &&
              <Label className='text__align--center' as='p' basic size='huge' color='red'>
                <FormattedMessage {...messages.noStock} />
              </Label>
            }
          </ProductImageSlider>
          {
            product.get('promo') &&
            <TimerWrapper promo={product.get('promo')} centered />
          }
          <ProductMainContent>
            <LoadingStateInfo loading={loading} center>
              {
                product.get('brand')
                ? <Label className='no-margin-bottom color__grey' as='p' basic size='large'>{product.getIn(['brand', 'name'])}</Label>
                : null
              }
              <Label as='p' basic size='big' className='padding__horizontal--15'>{product.get('title')}</Label>
              <ToggleFullPoints
                isFullPointsOnly={_isFullPointsOnly}
                entity={product}
              />
            </LoadingStateInfo>
          </ProductMainContent>

          {
            product.get('association') &&
            <SizeSelector
              product={product}
              onSizeChange={onSizeChange}
            />
          }

          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <ToggleEarnPoints
                  entity={product}
                  isFullPointsOnly={_isFullPointsOnly}
                  changeRoute={changeRoute}
                />

                <SocialContainer>
                  <Label className='color__secondary text__weight--400' as='p' basic size='medium'>
                    <FormattedMessage {...messages.shareItem} />
                  </Label>
                  <ShareWrapper>
                    <button className='unstyle-button share-button' onClick={fbShareAction}>
                      <FacebookIcon round size={35} />
                    </button>

                    <TwitterShareButton
                      className='share-button'
                      title={product.get('title')}
                      via='711philippines'
                      url={window.location.href} >
                      <TwitterIcon size={35} round />
                    </TwitterShareButton>

                    <a onClick={_handleMailTo} className='share-button'>
                      <Icon circular inverted name='mail' color='orange' />
                    </a>

                    <button className='unstyle-button share-button' onClick={() => fbMessengerShare(FB_SHARE_ID)}>
                      <Image src={MessengerIcon} alt='CLiQQ' />
                    </button>

                    <button className='unstyle-button share-button' onClick={(e) => viberShare(e, 'Check this out:')}>
                      <Image src={ViberIcon} alt='CLiQQ' />
                    </button>

                    <button className='unstyle-button share-button' onClick={() => whatsAppShare('Check this out:')}>
                      <Image src={WhatsAppIcon} alt='CLiQQ' />
                    </button>
                  </ShareWrapper>
                </SocialContainer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <div className='background__white box__shadow--primary margin__top-positive--10'>
          <DetailsWrapper>
            <ProductDetails>
              <Label as='p' basic size='large' className='color__grey text__weight--500'>
                <FormattedMessage {...messages.productDetailsTitle} />
              </Label>
              <LoadingStateInfo loading={loading} className='color__light-grey' >
                <div className='product-details text__weight--400' dangerouslySetInnerHTML={{__html: product.get('details')}} />
              </LoadingStateInfo>
            </ProductDetails>
            <ListCollapse title={
              <Label as='p' className='margin__none color__grey text__weight--500' size='large' >
                <FormattedMessage {...messages.deliveryReturnsPolicy} />
              </Label>
            }>
              <CollapseContent>
                <Image src={DeliveryIcon} alt='CLiQQ' />
                <div className='collapse-description'>
                  <Label className='padding__none text__weight--500' as='span' basic size='medium'>
                    <FormattedMessage {...messages.deliveryTitle} />
                  </Label>
                  <Label className='text__weight--400' as='p' basic size='medium'>
                    <span dangerouslySetInnerHTML={{__html: product.get('deliveryPromiseMessage')}} />
                  </Label>
                </div>
              </CollapseContent>
              <CollapseContent>
                <Image src={ReturnIcon} alt='CLiQQ' />
                <div className='collapse-description'>
                  <Label className='padding__none text__weight--500' as='span' basic size='medium'>
                    <FormattedMessage {...messages.returnPolicy} />
                  </Label>
                  <Label className='text__weight--400' as='p' basic size='medium'>
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
                className='text__weight--700 border__radius--none'
                disabled={+product.get('quantity') === 0}
                fluid > <FormattedMessage {...messages.placeOrder} /> </Button>
            </ButtonContainer>
          </DetailsWrapper>
        </div>

      </ProductWrapper>

      {
        lightBoxImage &&
        <LightBox
          images={productImages}
          active={lightBoxImage}
          close={toggleLightBox}
          loader={loading} />
      }

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
  onSizeChange: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  _isFullPointsOnly: PropTypes.bool.isRequired
}

export default Product
