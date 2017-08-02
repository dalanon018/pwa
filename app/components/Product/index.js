/**
*
* Product
*
*/

import React, { PropTypes } from 'react'

import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Image, Icon, Popup } from 'semantic-ui-react'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import Test0001 from 'images/test-images/BACKPACK-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import ShareIconImage from 'images/icons/share-icon.svg'

import Button from 'components/Button'
import H3 from 'components/H3'

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
  DetailsTitle,
  SocialButtonWrapper,
  DetailsDescription,
  ButtonContainer
} from './styled'

const Product = ({
  product,
  loading,
  popup,
  toggle,
  toggleClick,
  copied }) => {
  const cliqqCode = product.get('cliqqCode') && product.get('cliqqCode').join(', ')
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const {
    FacebookShareButton,
    TwitterShareButton
  } = ShareButtons
  return (
    <ProductWrapper>
      <ImageBanner>
        <LoadingStateImage loading={loading}>
          <Image src={Test0001} />
        </LoadingStateImage>
      </ImageBanner>
      <ProductMainContent>
        <LoadingStateInfo loading={loading} center>
          <HeaderWrapper>
            <CodeImage src={CliqqLogo} /> { cliqqCode }
          </HeaderWrapper>
          <H3
            weight='300'
            letterSpacing='4px'
            uppercase
            center
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

      <DetailsWrapper>
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
    </ProductWrapper>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Product
