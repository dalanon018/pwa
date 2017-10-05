import React from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Icon, Popup } from 'semantic-ui-react'

import ShareIconImage from 'images/icons/share-icon.svg'

import Button from 'components/Button'
import H3 from 'components/H3'
import ProductSlider from 'components/BannerSlider'

import { calculateProductPrice } from 'utils/promo'
import { fbShare } from 'utils/fb-share'

import {
  // LoadingStateImage,
  LoadingStateInfo
} from 'components/LoadingBlock'

import messages from './messages'
import {
  // ImageBanner,
  ButtonContainer,
  CodeImage,
  DetailsDescription,
  DetailsTitle,
  DetailsWrapper,
  HeaderWrapper,
  ProductDetails,
  ProductMainContent,
  ProductPrice,
  ProductPriceStrike,
  ProductPriceTitle,
  ProductPriceWrapper,
  ProductWrapper,
  ShareIcon,
  ShareItemWrapper,
  ShippingDetails,
  SocialButtonWrapper,
  SocialContainer,
  ProductImageSlider
} from './styled'

function MobileBlock ({
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  cliqqCode,
  cliqqLogo,
  copied,
  loading,
  popup,
  product,
  toggle,
  toggleClick,
  windowWidth
}) {
  const productImages = [product.get('image')]
  return (
    <ProductWrapper className='mobile-visibility'>
      <ProductImageSlider>
        <ProductSlider
          images={productImages}
          loader={loading} />
      </ProductImageSlider>
      <ProductMainContent>
        <LoadingStateInfo loading={loading} center>
          <HeaderWrapper>
            <CodeImage src={cliqqLogo} /> { cliqqCode }
          </HeaderWrapper>
          <H3
          > { product.get('title') } </H3>
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

      <SocialContainer>
        <ShareItemWrapper onClick={toggleClick}>
          <ShareIcon src={ShareIconImage} /> SHARE ITEM
        </ShareItemWrapper>

        <SocialButtonWrapper visibility={toggle}>

          <button className='unstyle-button' onClick={() => fbShare(product)}>
            <FacebookIcon round size={40} />
          </button>

          <TwitterShareButton
            title={product.get('title')}
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

      <DetailsWrapper>
        <ProductDetails>
          <DetailsTitle> <FormattedMessage {...messages.productDetailsTitle} /> </DetailsTitle>
          <LoadingStateInfo loading={loading}>
            <DetailsDescription>
              <div dangerouslySetInnerHTML={{__html: product.get('details')}} />
            </DetailsDescription>
          </LoadingStateInfo>
        </ProductDetails>
        <ShippingDetails>
          <DetailsTitle> <FormattedMessage {...messages.productDeliveryTitle} /> </DetailsTitle>
          <LoadingStateInfo loading={loading}>
            <DetailsDescription>
              <div dangerouslySetInnerHTML={{__html: product.get('shipping')}} />
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

    </ProductWrapper>
  )
}

export default MobileBlock
