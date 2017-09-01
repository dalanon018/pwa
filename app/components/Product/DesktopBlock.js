import React from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Grid, Modal } from 'semantic-ui-react'

import Button from 'components/Button'
import H3 from 'components/H3'
import ProductSlider from 'components/BannerSlider'
import PopupSlide from 'components/PopupSlide'

import { calculateProductPrice } from 'utils/promo'

import {
  // LoadingStateImage,
  LoadingStateInfo
} from 'components/LoadingBlock'

import messages from './messages'
import {
  // ImageBanner,
  CodeImage,
  DesktopPriceWrapper,
  DetailsDescription,
  DetailsTitle,
  DigitsWrapper,
  HeaderWrapper,
  OrderButtonWrapper,
  ProductDetails,
  ProductMainContent,
  ProductPriceStrike,
  ShareIcons,
  ShippingDetails
} from './styled'

function DesktopBlock ({
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  cliqqCode,
  cliqqLogo,
  closeModal,
  copied,
  defaultImage,
  loading,
  mobileNumber,
  modalStatus,
  modalToggle,
  onClose,
  openModal,
  popup,
  product,
  productPageTrigger,
  submit,
  toggle,
  toggleClick,
  toggleModal,
  windowWidth
}) {
  const productImages = [product]

  return (
    <div className='desktop-visibility'>

      <Grid padded>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <ProductSlider
              images={productImages}
              productPageTrigger={productPageTrigger}
              windowWidth={windowWidth}
              loader={loading} />
          </Grid.Column>
          <Grid.Column>
            <ProductMainContent>
              <LoadingStateInfo loading={loading} center>
                <H3
                  weight='300'
                  letterSpacing='4px'
                  uppercase
                  center
                > { product.get('title') } </H3>
                <HeaderWrapper>
                  <CodeImage src={cliqqLogo} /> { cliqqCode }
                </HeaderWrapper>

              </LoadingStateInfo>
            </ProductMainContent>
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

            <ProductDetails>
              <DetailsTitle> <FormattedMessage {...messages.productDetailsTitle} /> </DetailsTitle>
              <LoadingStateInfo loading={loading}>
                <DetailsDescription>
                  <div dangerouslySetInnerHTML={{__html: product.get('details')}} />
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
                  <div dangerouslySetInnerHTML={{__html: product.get('shipping')}} />
                </DetailsDescription>
              </LoadingStateInfo>
            </ShippingDetails>

            <Modal trigger={
              <OrderButtonWrapper>
                <Button
                  desktopLayout
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

          </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  )
}

export default DesktopBlock
