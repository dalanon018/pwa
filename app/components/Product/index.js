/**
*
* Product
*
*/

import React, { PropTypes } from 'react'

import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Image, Icon, Popup, Grid, Modal } from 'semantic-ui-react'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import Test0001 from 'images/test-images/BACKPACK-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import ShareIconImage from 'images/icons/share-icon.svg'
import Brand from 'images/test-images/PENSHOPPE-TICKET.png'

import Button from 'components/Button'
import H3 from 'components/H3'
import PopupSlide from 'components/PopupSlide'

import { calculateProductPrice } from 'utils/promo'

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
  SocialContainer,
  ProductPriceStrike,
  ShareItemWrapper,
  ShareIcon,
  DetailsWrapper,
  ProductDetails,
  ShippingDetails,
  DesktopImageBanner,
  BrandInfo,
  DetailsTitle,
  SocialButtonWrapper,
  DetailsDescription,
  ButtonContainer,
  CodeWrapper,
  DesktopProductDetails,
  ShareIcons,
  DigitsWrapper,
  DesktopPriceWrapper,
  OrderButtonWrapper
} from './styled'

const Product = ({
  product,
  loading,
  popup,
  toggle,
  toggleClick,
  copied,

  // For Phone Prompt Desktop Modal
  submit,
  modalToggle,
  toggleModal,
  openModal,
  modalStatus,
  closeModal,
  mobileNumber,
  onClose }) => {
  const cliqqCode = product.get('cliqqCode') && product.get('cliqqCode').join(', ')
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const {
    FacebookShareButton,
    TwitterShareButton
  } = ShareButtons

  return (
    <ProductWrapper>
      <ImageBanner className='mobile-visibility'>
        <LoadingStateImage loading={loading}>
          <Image src={Test0001} />
        </LoadingStateImage>
      </ImageBanner>
      <DesktopImageBanner className='desktop-visibility'>
        <div className='background-wrapper'>
          <Grid padded>
            <Grid.Row columns='equal' verticalAlign='middle'>
              <Grid.Column>
                <Image className='product-image' src={Test0001} />
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <BrandInfo>
                  <div className='brand-wrapper'>
                    <Image src={Brand} />
                  </div>
                  <CodeWrapper>
                    <CodeImage src={CliqqLogo} /> { cliqqCode }
                  </CodeWrapper>
                </BrandInfo>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </DesktopImageBanner>
      <ProductMainContent>
        <LoadingStateInfo loading={loading} center>
          <HeaderWrapper className='mobile-visibility'>
            <CodeImage src={CliqqLogo} /> { cliqqCode }
          </HeaderWrapper>
          <H3
            weight='300'
            letterSpacing='4px'
            uppercase
            center
          > { product.get('title') } </H3>
          <ProductPriceWrapper className='mobile-visibility'>
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

      <SocialContainer className='mobile-visibility'>
        <ShareItemWrapper onClick={toggleClick}>
          <ShareIcon src={ShareIconImage} /> SHARE ITEM
        </ShareItemWrapper>

        <SocialButtonWrapper visibility={toggle}>

          <FacebookShareButton
            title={product.get('title')}
            description={product.get('details')}
            url={window.location.href}
            picture={product.get('image')} >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton
            title={product.get('title')}
            // hashtags={['asd', 'qwe']}
            via='711philippines'
            url={window.location.href} >
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <CopyToClipboard text={window.location.href}>
            <span onCopy={copied}>
              <Popup
                trigger={<Icon name='linkify' className='copy-to-clipboard' />}
                on='click'
                hideOnScroll
                content='Product URL copied' />
            </span>
          </CopyToClipboard>

        </SocialButtonWrapper>
      </SocialContainer>

      <DetailsWrapper className='mobile-visibility'>
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
            onClick={popup}
            primary
            fluid
            loading={loading}
          > <FormattedMessage {...messages.orderNow} /> </Button>
        </ButtonContainer>
      </DetailsWrapper>

      <DesktopProductDetails className='desktop-visibility'>
        <Grid padded divided>
          <Grid.Row columns='equal'>
            <Grid.Column>
              <ProductDetails>
                <DetailsTitle> <FormattedMessage {...messages.productDetailsTitle} /> </DetailsTitle>
                <LoadingStateInfo loading={loading}>
                  <DetailsDescription>
                    { product.get('details') }
                  </DetailsDescription>
                </LoadingStateInfo>
              </ProductDetails>

              <ShareIcons>
                <DetailsTitle>SHARE THIS ITEM:</DetailsTitle>
                <div className='icons-wrapper'>
                  <FacebookShareButton
                    title={product.get('title')}
                    description={product.get('details')}
                    url={window.location.href}
                    picture={product.get('image')} >
                    <FacebookIcon size={25} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    title={product.get('title')}
                    // hashtags={['asd', 'qwe']}
                    via='711philippines'
                    url={window.location.href} >
                    <TwitterIcon size={25} round />
                  </TwitterShareButton>
                </div>
              </ShareIcons>

              <ShippingDetails>
                <DetailsTitle> <FormattedMessage {...messages.productDeliveryTitle} /> </DetailsTitle>
                <LoadingStateInfo loading={loading}>
                  <DetailsDescription>
                    { product.get('shipping') }
                  </DetailsDescription>
                </LoadingStateInfo>
              </ShippingDetails>
            </Grid.Column>
            <Grid.Column>
              <DigitsWrapper>
                <label>PRICE</label>
                <DesktopPriceWrapper colorHex='#F58322'>
                  <p>PHP { calculateProductPrice(product) }</p>
                  <span>
                    {
                      !isEmpty(product.get('discount')) &&
                      <ProductPriceStrike>PHP {product.get('price')}</ProductPriceStrike>
                    }
                  </span>
                </DesktopPriceWrapper>
                {/*
                  <DesktopPointsWrapper colorHex='#8DC640'>
                      // E3
                  </DesktopPointsWrapper>
                */}
              </DigitsWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal trigger={
          <OrderButtonWrapper>
            <Button
              loading={loading}
              onClick={openModal}
              primary
            > <FormattedMessage {...messages.orderNow} /> </Button>
          </OrderButtonWrapper>
          }
          open={modalStatus}
          onClose={closeModal}
          >
          <div className='modal-popup-slide'>
            <PopupSlide
              submit={submit}
              modalToggle={modalToggle}
              toggle={toggleModal}
              mobileNumber={mobileNumber}
              onClose={closeModal} />
          </div>
        </Modal>
      </DesktopProductDetails>
    </ProductWrapper>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Product
