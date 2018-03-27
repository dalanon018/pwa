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

import DeliveryIcon from 'images/test-images/v2/delivery-icon.svg'
import ReturnIcon from 'images/test-images/v2/return-icon.svg'

import { fbShare } from 'utils/fb-share'
import { paramsImgix } from 'utils/image-stock'

import ProductSlider from 'components/Desktop/BannerSlider'
// import ListCollapse from 'components/Shared/ListCollapse'
import PromptModal from 'components/Shared/PromptModal'
import LightBox from 'components/Desktop/LightBox'

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
  ProductWrapper,
  SocialContainer,
  ShareWrapper,
  ProductImageSlider,
  DetailsContent,
  DeliveryPolicy,
  CustomGrid,
  LeftColumnWrapper
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
  isProductPage
}) => {
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const {
    TwitterShareButton
  } = ShareButtons
  const productSliders = product.get('sliders') ? product.get('sliders').toArray().map(updateParamsImages) : []
  // we need to add our main image to sliders
  const productImages = [updateParamsImages(product.get('image'))].concat(productSliders)

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

  return (
    <div>
      <Container>
        <Grid>
          <Grid.Row columns={2}>
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
                      <Label className='text__align--center' as='p' basic size='huge' color='red'>
                        <FormattedMessage {...messages.noStock} />
                      </Label>
                    }
                  </ProductImageSlider>
                  <ProductMainContent>
                    <LoadingStateInfo loading={loading} center>
                      <ButtonContainer className='background__white'>
                        <Button
                          onClick={onSubmit}
                          loading={loading}
                          primary
                          disabled={+product.get('quantity') === 0} > <FormattedMessage {...messages.orderNow} /> </Button>
                      </ButtonContainer>
                    </LoadingStateInfo>
                  </ProductMainContent>

                  {
                    product.get('association') &&
                    <SizeSelector
                      product={product}
                      onSizeChange={onSizeChange}
                    />
                  }

                  <SocialContainer>
                    <p className='share-item ui big basic label color__secondary'><FormattedMessage {...messages.shareItem} /></p>
                    <ShareWrapper>

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
                </AffixWrapper>
              </LeftColumnWrapper>
            </Grid.Column>
            <CustomGrid className={hover && 'active'}>
              <DetailsWrapper id='right-column-preview'>
                <LoadingStateInfo>
                  {
                    product.get('brand')
                    ? <Label onClick={changeRoute.bind(this, `/brands/${product.getIn(['brand', 'code'])}`)} className='no-margin-bottom color__secondary margin__none brand-title' as='span' basic size='big'>{product.getIn(['brand', 'name'])}</Label>
                    : null
                  }
                  <Label as='p' className='margin__none' basic size='big'>{product.get('title')}</Label>
                  <ProductPriceWrapper>
                    <Label className='product-price' as='b' basic size='massive' color='orange'>
                      <FormattedMessage {...messages.peso} />
                      { origPrice(product) }
                    </Label>
                    { toggleDiscount(product.get('discountPrice')) }
                  </ProductPriceWrapper>
                </LoadingStateInfo>
                <ProductDetails>
                  <Label as='p' basic size='big' className='color__secondary border_bottom__one--light-grey padding__bottom--5'> <FormattedMessage {...messages.productDetailsTitle} /> </Label>
                  <LoadingStateInfo loading={loading} className='color__light-grey' >
                    <div className='product-details text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: product.get('details')}} />
                  </LoadingStateInfo>
                </ProductDetails>

                <DeliveryPolicy>
                  <Label as='p' className='margin__none color__secondary border_bottom__one--light-grey padding__bottom--5' size='large' >
                    <FormattedMessage {...messages.deliveryReturnsPolicy} />
                  </Label>

                  <div className='margin__top-positive--20'>
                    <DetailsContent>
                      <Image src={DeliveryIcon} alt='CLiQQ' />
                      <div className='collapse-description'>
                        <Label className='description-title color__secondary' as='p' basic size='large'><FormattedMessage {...messages.deliveryTitle} /></Label>
                        <Label className='text__roboto--light color__dark-grey' as='p' basic size='medium'>
                          <span dangerouslySetInnerHTML={{__html: product.get('deliveryPromiseMessage')}} />
                        </Label>
                      </div>
                    </DetailsContent>
                    <DetailsContent>
                      <Image src={ReturnIcon} alt='CLiQQ' />
                      <div className='collapse-description'>
                        <Label className='description-title primary__secondary' as='p' basic size='large'><FormattedMessage {...messages.returnPolicy} /></Label>
                        <Label className='text__roboto--light color__dark-grey' as='p' basic size='medium'>
                          <span dangerouslySetInnerHTML={{__html: product.get('returnPolicy')}} />
                        </Label>
                      </div>
                    </DetailsContent>
                  </div>
                </DeliveryPolicy>
                {
                  product.get('additionalDetails')
                  ? <div>
                    <Label as='p' className='margin__none' size='large' >
                      <FormattedMessage {...messages.additionalInfo} />
                    </Label>
                    <div>
                      <Label as='p' color='grey' basic size='medium'>
                        <span dangerouslySetInnerHTML={{__html: product.get('additionalDetails')}} />
                      </Label>
                    </div>
                  </div>
                  : ''
                }
              </DetailsWrapper>
            </CustomGrid>
          </Grid.Row>
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
