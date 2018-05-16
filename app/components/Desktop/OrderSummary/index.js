/**
*
* OrderSummary
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import { isEmpty } from 'lodash'
import { ifElse, identity } from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Label, Form, Checkbox, Image, Button, Container } from 'semantic-ui-react'

import NextIcon from 'images/icons/greater-than-icon.svg'
import MobileIcon from 'images/icons/order-summary/register.png'
import WalletIcon from 'images/icons/order-summary/payment-method.png'
import LocationIcon from 'images/icons/order-summary/select-store.png'

import Modal from 'components/Shared/PromptModal'
import ListCollapse from 'components/Shared/ListCollapse'
import PlainCard from 'components/Shared/PlainCard'
import SectionTitle from 'components/Shared/SectionTitle'
// import { LoadingStateImage } from 'components/Shared/LoadingBlock'

import { paramsImgix } from 'utils/image-stock'

import messages from './messages'
import {
  DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  StepWrapper,
  LocationButton,
  ProductContainer,
  ProductDetails,
  BottomWrapper,
  LabelPrice,
  LabelTitle,
  BlockWrapper
} from './styles'

class OrderSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function+
  _updateParamsImages = (images, opt = {}) => {
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

  _toggleOrigDiscountPrice = (product) => {
    const showPrice = product.get('discountPrice') || product.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  _showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  render () {
    const {
      ShowCodComponent,
      errorMessage,
      isBlackListed,
      modalToggle,
      modePayment,
      orderRequesting,
      orderedProduct,
      // productLoader,
      store,
      storeLocatorVisibility,
      intl,
      mobileNumbers,

      _handleModalClose,
      _handleProceed,
      _handleStoreLocator,
      _stepWrapperRef,
      _handleToBottom,
      _handleChange } = this.props

    const toggleDiscount = this._showDiscountPrice(
      <Label className='padding__none color__grey orig-price' as='b' basic size='large'>
        <FormattedMessage {...messages.peso} />
        { orderedProduct.get('price') &&
          parseFloat(orderedProduct.get('price')).toLocaleString() }
      </Label>,
      null
    )

    const labelOne = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashPrepaid} />
        </Label>
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    const labelTwo = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashDelivery} />
        </Label>
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    return (
      <div>
        <Container>
          <Grid padded>
            <Grid.Row className='padding__bottom--none'>
              <Grid.Column>
                <SectionTitle title={intl.formatMessage(messages.orderSummary)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* <LoadingStateImage loading={productLoader} center> */}
          <Grid padded>
            <Grid.Row columns={2} className='padding__top--none'>
              <Grid.Column width={11}>
                <Grid.Row className='margin__bottom-positive--20'>
                  <PlainCard borderRadius alignLeft>
                    <BlockWrapper verticalCentered>
                      <div>
                        <Image className='icon' src={MobileIcon} alt='CLiQQ' />
                      </div>
                      <div>
                        <Label as='p' className='margin__none text__weight--500' size='huge'>
                          <FormattedMessage {...messages.registeredMobile} />
                        </Label>
                      </div>
                      <div className='margin__left-positive--30'>
                        <Label as='p' className='margin__none text__weight--400' size='large'>
                          <FormattedMessage {...messages.signedAs} />
                          {mobileNumbers.last()}
                        </Label>
                      </div>
                    </BlockWrapper>
                  </PlainCard>
                </Grid.Row>
                <Grid.Row className='margin__bottom-positive--20'>
                  <PlainCard borderRadius alignLeft noImageRadius>
                    <BlockWrapper>
                      <div>
                        <Image className='icon' src={WalletIcon} alt='CLiQQ' />
                      </div>
                      <div>
                        <Label as='p' className='margin__top-positive--15 margin__bottom-positive--15 text__weight--500' size='huge'>
                          <FormattedMessage {...messages.methodPayment} />
                        </Label>
                        <Label as='p' className='text__weight--400' size='large'>
                          <FormattedMessage {...messages.earnPoints} />
                        </Label>
                        <SelectMethodWrapper checkHeight={orderedProduct.get('discountPrice') !== 0}>
                          <Form>
                            <div className='payment-wrapper'>
                              <ShowCodComponent
                                radio
                                isBlackListed={isBlackListed}
                                name='cod'
                                value='COD'
                                label={labelTwo}
                                checked={modePayment === 'COD'}
                                onChange={_handleChange}
                                onClick={_handleToBottom}
                              />
                              <Form.Field>
                                <Checkbox
                                  radio
                                  className='margin__bottom-positive--20'
                                  name='cash-prepaid'
                                  value='CASH'
                                  label={labelOne}
                                  checked={modePayment === 'CASH'}
                                  onChange={_handleChange}
                                  />
                              </Form.Field>
                            </div>
                          </Form>
                        </SelectMethodWrapper>
                      </div>
                    </BlockWrapper>
                  </PlainCard>
                </Grid.Row>
                <Grid.Row className='margin__bottom-positive--20'>
                  <PlainCard borderRadius alignLeft>
                    <BlockWrapper>
                      <div>
                        <Image className='icon' src={LocationIcon} alt='CLiQQ' />
                      </div>
                      <div>
                        <Label as='p' className='margin__top-positive--15 margin__bottom-positive--15 text__weight--500' size='huge'>
                          <FormattedMessage {...messages.chooseStore} />
                        </Label>
                        <Label as='p' className='text__weight--400 margin__bottom-positive--20' size='large'>
                          <FormattedMessage {...messages.defaultStore} />
                        </Label>
                        <StepWrapper innerRef={_stepWrapperRef} className='visibility' visibility={storeLocatorVisibility}>
                          <LocationButton id='scrollToAnimate' className='color__secondary border__two--light-grey' onClick={_handleStoreLocator} iconBg={NextIcon}>
                            <Label as='span' className='text__weight--700' basic size='large'>
                              {
                                store && isEmpty(store)
                                ? <FormattedMessage {...messages.findStore} />
                                : <span>{store.id} {store.name}</span>
                              }
                            </Label>
                          </LocationButton>
                        </StepWrapper>
                        <Label as='p' className='margin__none text__weight--400 margin__top-positive--20' size='large'>
                          <FormattedMessage
                            {...messages.cantFindStore}
                            values={{storeLocator: (
                              <span className='color__primary cursor__pointer' onClick={_handleStoreLocator}>
                                <FormattedMessage
                                  {...messages.storeLocator}
                                />
                              </span>
                            )}}
                          />
                        </Label>
                      </div>
                    </BlockWrapper>
                  </PlainCard>

                  <BottomWrapper>
                    <ButtonContainer>
                      <Button onClick={_handleProceed} primary loading={orderRequesting}>
                        <FormattedMessage {...messages.proceedNext} />
                      </Button>
                    </ButtonContainer>
                  </BottomWrapper>
                </Grid.Row>
              </Grid.Column>
              {/* ----------------------------------- */}
              <Grid.Column width={5}>
                <PlainCard borderRadius alignLeft>
                  <div>
                    <ProductContainer>
                      <ProductItem>
                        <Image alt='CLiQQ' src={this._updateParamsImages(orderedProduct.get('image'))} />
                      </ProductItem>
                      <ProductDetails>
                        {
                          orderedProduct.get('brand')
                          ? <Label className='no-margin-bottom color__grey' as='p' basic size='large'>{orderedProduct.getIn(['brand', 'name'])}</Label>
                          : null
                        }
                        <Label as='p' basic size='huge' className='text__weight--500 padding__horizontal--15'>{orderedProduct.get('title')}</Label>

                        <Label className='padding__none base-price' as='b' basic size='massive' color='orange'>
                          <FormattedMessage {...messages.peso} />
                          { this._toggleOrigDiscountPrice(orderedProduct) }
                        </Label>

                        { toggleDiscount(orderedProduct.get('discountPrice')) }

                        {
                          orderedProduct.get('size') &&
                          <Label as='p' basic size='big' className='text__weight--400 padding__horizontal--15'>
                            <FormattedMessage {...messages.size} />
                            {orderedProduct.get('size')}
                          </Label>
                        }

                      </ProductDetails>
                    </ProductContainer>

                    <DetailsWrapper>
                      <ListCollapse title={
                        <Label as='p' basic className='text__weight--400 margin__none' size='large'>
                          <FormattedMessage {...messages.viewDetails} />
                        </Label>
                      } disableScroll>
                        <div className='sub-title color__secondary'>
                          <FormattedMessage {...messages.productDetailsTitle} />
                        </div>
                        <div className='margin__bottom-positive--10 text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
                        <div className='sub-title color__secondary'>
                          <FormattedMessage {...messages.productDeliveryTitle} />
                        </div>
                        <div className='text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: orderedProduct.get('deliveryPromiseMessage')}} />
                      </ListCollapse>
                    </DetailsWrapper>
                  </div>
                </PlainCard>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Modal
          open={modalToggle}
          name='warning'
          title={errorMessage}
          content=''
          close={_handleModalClose}
        />
      </div>

    )
  }
}

OrderSummary.propTypes = {
  orderedProduct: PropTypes.object.isRequired,
  orderRequesting: PropTypes.bool.isRequired,
  isBlackListed: PropTypes.bool.isRequired,
  productLoader: PropTypes.bool.isRequired,
  ShowCodComponent: PropTypes.func.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  modePayment: PropTypes.string.isRequired,
  modalToggle: PropTypes.bool.isRequired,
  storeLocatorVisibility: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  mobileNumbers: PropTypes.array.isRequired,

  _handleModalClose: PropTypes.func.isRequired,
  _handleProceed: PropTypes.func.isRequired,
  _handleStoreLocator: PropTypes.func.isRequired,
  _stepWrapperRef: PropTypes.func.isRequired,
  _handleToBottom: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
}

export default OrderSummary
