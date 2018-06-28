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
import { Image, Label, Button, Icon, Grid, Container } from 'semantic-ui-react'

import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'
import CliQQPlainLogo from 'images/icons/cliqq.png'

import { fbShare } from 'utils/fb-share'
import { paramsImgix } from 'utils/image-stock'
import { calculateEarnPoints } from 'utils/calculation'
import { toggleOrigDiscountPrice, computeTotalPointsPrice } from 'utils/product'

import ProductSlider from 'components/Desktop/BannerSlider'
// import ListCollapse from 'components/Shared/ListCollapse'
import PromptModal from 'components/Shared/PromptModal'
import LightBox from 'components/Shared/LightBox'
import TimerWrapper from 'components/Desktop/TimerWrapper'

import { LoadingStateInfo } from 'components/Shared/LoadingBlock'
import AffixWrapper from 'components/Shared/Affix'

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
  DetailsContent,
  DeliveryPolicy,
  CustomGrid,
  LeftColumnWrapper,
  CustomRow,
  PointsInfo
} from './styled'

const toggleComponent = (component1, component2) => (condition) => ifElse(
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

const getHighestPointsEarn = (product) => {
  const amount = product.get('discountPrice') || product.get('price')

  return `${calculateEarnPoints({
    multiplier: product.getIn(['points', 'multiplier']),
    method: product.getIn(['points', 'method', 'cash']).toObject(),
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
  const toggleDiscount = toggleComponent(
    <Label className='product-discount' as='span' basic size='huge' color='grey'>
      <FormattedMessage {...messages.peso} />
      { entity.get('price') &&
        parseFloat(entity.get('price')).toLocaleString() }
    </Label>,
    null
  )

  return (
    <ProductPriceWrapper>
      <Label className='product-price' as='b' basic size='massive' color='orange'>
        <FormattedMessage {...messages.peso} />
        { toggleOrigDiscountPrice(entity) }
      </Label>
      { toggleDiscount(entity.get('discountPrice')) }
    </ProductPriceWrapper>
  )
}

export const ToggleFullPoints = ({ isFullPointsOnly, ...rest }) => {
  return toggleComponent(
    <DisplayProductPointsPrice {...rest} />,
    <DisplayProductPrice {...rest} />
  )(isFullPointsOnly)
}

export const ToggleEarnPoints = ({ entity, isFullPointsOnly, changeRoute }) => {
  return toggleComponent(
    <PointsInfo>
      <Image src={CliQQPlainLogo} alt='CLiQQ' />
      <Label as='span' basic size='medium' className='text__weight--400'>
        <FormattedMessage
          {...messages.earnPoints}
          values={{
            points: <span className='color__primary'>{getHighestPointsEarn(entity)}</span>,
            termsConditions: <span className='color__primary cursor__pointer' onClick={() => changeRoute('/terms-conditions')}><FormattedMessage {...messages.applyTermsConditions} /></span>
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
  toggleLightBox,
  handleMouseEnter,
  handleMouseLeave,
  origPrice,
  isMobile,
  copied,
  productSlider,
  lightBoxImage,
  togglePrompt,
  productPageTrigger,
  windowWidth,
  onSizeChange,
  hover,
  offset,
  isProductPage,
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

  return (
    <div>
      <Container>
        <Grid padded>
          <CustomRow columns={2}>
            <Grid.Column>
              <LeftColumnWrapper>
                <AffixWrapper offset={offset} top={offset}>
                  <ProductImageSlider>
                    <ProductSlider
                      hover={hover}
                      images={productImages}
                      toggleLightBox={toggleLightBox}
                      lightBoxImage={lightBoxImage}
                      loader={loading}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      isInfinite
                      isLowerdots
                      isProductPage={isProductPage}
                    />
                    {
                      +product.get('quantity') === 0 &&
                      <Label className='text__align--center' as='p' basic size='large' color='red'>
                        <FormattedMessage {...messages.noStock} />
                      </Label>
                    }
                  </ProductImageSlider>

                  {
                    product.get('promo') &&
                    <TimerWrapper promo={product.get('promo')} centered />
                  }

                  <SocialContainer>
                    <Label className='share-item text__weight--500' as='p' basic size='large'>
                      <FormattedMessage {...messages.shareItem} />
                    </Label>
                    <ShareWrapper>

                      <button className='unstyle-button share-button' onClick={fbShareAction}>
                        <FacebookIcon round size={40} />
                      </button>

                      <TwitterShareButton
                        className='share-button'
                        title={product.get('title')}
                        via='711philippines'
                        url={window.location.href} >
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>

                      <a onClick={_handleMailTo} className='share-button'>
                        <Icon circular inverted name='mail' color='orange' />
                      </a>
                    </ShareWrapper>
                  </SocialContainer>
                </AffixWrapper>
              </LeftColumnWrapper>
            </Grid.Column>
            <CustomGrid>
              {/* className={hover && 'active'} */}
              <DetailsWrapper id='right-column-preview'>
                <LoadingStateInfo>
                  {
                    product.get('brand')
                    ? <Label onClick={changeRoute.bind(this, `/brands/${product.getIn(['brand', 'code'])}`)} className='color__grey no-margin-bottom brand-title' as='p' basic size='large'>{product.getIn(['brand', 'name'])}</Label>
                    : null
                  }
                  <Label as='p' className='text__weight--500' basic size='huge'>{product.get('title')}</Label>
                  <ToggleFullPoints
                    isFullPointsOnly={_isFullPointsOnly}
                    entity={product}
                  />
                </LoadingStateInfo>

                <div>
                  {
                    product.get('association') &&
                    <SizeSelector
                      product={product}
                      onSizeChange={onSizeChange}
                    />
                  }
                </div>

                <ProductMainContent>
                  <LoadingStateInfo loading={loading} center>
                    <ButtonContainer>
                      <Button
                        onClick={onSubmit}
                        loading={loading}
                        primary
                        disabled={+product.get('quantity') === 0} > <FormattedMessage {...messages.orderNow} /> </Button>
                    </ButtonContainer>
                  </LoadingStateInfo>

                  <ToggleEarnPoints
                    entity={product}
                    isFullPointsOnly={_isFullPointsOnly}
                    changeRoute={changeRoute}
                  />
                </ProductMainContent>

                <ProductDetails>
                  <Label as='p' basic size='huge' className='color__grey border_bottom__two--light-grey padding__bottom--5 text__weight--500'>
                    <FormattedMessage {...messages.productDetailsTitle} />
                  </Label>
                  <LoadingStateInfo loading={loading}>
                    <div className='dangerous-html' dangerouslySetInnerHTML={{__html: product.get('details')}} />
                  </LoadingStateInfo>
                </ProductDetails>

                <DeliveryPolicy>
                  <Label as='p' basic size='huge' className='color__grey border_bottom__two--light-grey padding__bottom--5 text__weight--500'>
                    <FormattedMessage {...messages.deliveryReturnsPolicy} />
                  </Label>

                  <div className='margin__top-positive--20'>
                    <DetailsContent>
                      <Image className='deliver-icon' src={DeliveryIcon} alt='CLiQQ' />
                      <div className='collapse-description'>
                        <Label className='description-title text__weight--500' as='p' basic size='big'>
                          <FormattedMessage {...messages.deliveryTitle} />
                        </Label>
                        <Label className='text__weight--400' as='p' basic size='large'>
                          <span dangerouslySetInnerHTML={{__html: product.get('deliveryPromiseMessage')}} />
                        </Label>
                      </div>
                    </DetailsContent>
                    <DetailsContent>
                      <Image className='return-icon' src={ReturnIcon} alt='CLiQQ' />
                      <div className='collapse-description'>
                        <Label className='description-title text__weight--500' as='p' basic size='big'>
                          <FormattedMessage {...messages.returnPolicy} />
                        </Label>
                        <Label className='text__weight--400' as='p' basic size='large'>
                          <span dangerouslySetInnerHTML={{__html: product.get('returnPolicy')}} />
                        </Label>
                      </div>
                    </DetailsContent>
                  </div>
                </DeliveryPolicy>
                {
                  product.get('additionalDetails')
                  ? <div>
                    <Label as='p' className='margin__none text__weight--500' size='big' >
                      <FormattedMessage {...messages.additionalInfo} />
                    </Label>
                    <div>
                      <Label className='text__weight--400 color__grey' as='p' basic size='large'>
                        <span dangerouslySetInnerHTML={{__html: product.get('additionalDetails')}} />
                      </Label>
                    </div>
                  </div>
                  : ''
                }
              </DetailsWrapper>
            </CustomGrid>
          </CustomRow>
        </Grid>
      </Container>

      <ProductWrapper />

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
  origPrice: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default Product
