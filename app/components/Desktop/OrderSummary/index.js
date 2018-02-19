/**
*
* OrderSummary
*
*/

import React from 'react'
import { isEmpty } from 'lodash'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import {
  identity,
  ifElse
} from 'ramda'

import { Grid, Label, Form, Checkbox, Image, Button, Container } from 'semantic-ui-react'

import { LoadingStateImage } from 'components/Shared/LoadingBlock'
import ListCollapse from 'components/Shared/ListCollapse'
import Modal from 'components/Shared/PromptModal'

import NextIcon from 'images/icons/greater-than-icon.svg'

import {
  DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  ProductReviewWrapper,
  MethodTitle,
  StepWrapper,
  StepHead,
  LocationButton,
  ProductContainer,
  ProductDetails,
  ProductMain,
  BottomWrapper
} from './styles'

class OrderSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const {
      ShowCodComponent,
      // brandLogo,
      errorMessage,
      isBlackListed,
      labelOne,
      labelTwo,
      modalToggle,
      modePayment,
      orderRequesting,
      orderedProduct,
      productLoader,
      store,
      visibility,

      _handleModalClose,
      _handleProceed,
      _handleStoreLocator,
      _stepWrapperRef,
      _handleToBottom,
      _handleChange,
      _updateParamsImages } = this.props

    const showDiscountPrice = (component1, component2) => (condition) => ifElse(
      identity,
      () => component1,
      () => component2
    )(condition)

    const toggleDiscount = showDiscountPrice(
      <Label className='padding__none color__grey orig-price' as='b' basic size='large'>
        <FormattedMessage {...messages.peso} />
        { orderedProduct.get('price') &&
          parseFloat(orderedProduct.get('price')).toLocaleString() }
      </Label>,
      null
    )

    return (
      <Container>
        <div className='padding__medium'>
          <Label as='span' basic size='huge' className='color__secondary'>
            <FormattedMessage {...messages.orderSummary} />
          </Label>
          <ProductReviewWrapper>
            <LoadingStateImage loading={productLoader} center>
              <ProductMain>
                <ProductContainer>
                  <ProductItem>
                    <Image alt='CLiQQ' src={_updateParamsImages(orderedProduct.get('image'))} />
                  </ProductItem>
                  <ProductDetails>
                    {
                      orderedProduct.get('brand')
                      ? <Label as='span' basic size='big' className='color__secondary'>{orderedProduct.getIn(['brand', 'name'])}</Label>
                      : null
                    }
                    <Label as='p' basic size='big' className='color__secondary'>{orderedProduct.get('title')}</Label>

                    <Label className='padding__none base-price' as='b' basic size='massive' color='orange'>
                      <FormattedMessage {...messages.peso} />
                      { orderedProduct.get('discountPrice') }
                    </Label>

                    { toggleDiscount(orderedProduct.get('discountPrice')) }

                  </ProductDetails>
                </ProductContainer>
                <ListCollapse title={
                  <Label as='p' className='margin__none color__secondary' size='large'>
                    <FormattedMessage {...messages.viewDetails} />
                  </Label>
                } disableScroll>
                  <DetailsWrapper>
                    <div className='sub-title color__secondary'>
                      <FormattedMessage {...messages.productDetailsTitle} />
                    </div>
                    <div className='margin__bottom-positive--10 text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
                    <div className='sub-title color__secondary'>
                      <FormattedMessage {...messages.productDeliveryTitle} />
                    </div>
                    <div className='text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: orderedProduct.get('deliveryPromiseMessage')}} />
                  </DetailsWrapper>
                </ListCollapse>
              </ProductMain>
            </LoadingStateImage>

            <Grid padded>
              <Grid.Row>
                <MethodTitle>
                  <Label as='span' basic size='huge' className='color__secondary'>
                    <FormattedMessage {...messages.methodPayment} />
                  </Label>
                </MethodTitle>
              </Grid.Row>
              <Grid.Row>
                <SelectMethodWrapper checkHeight={orderedProduct.get('discountPrice') !== 0}>
                  <Form>
                    <div className='payment-wrapper'>
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
                    </div>
                  </Form>
                </SelectMethodWrapper>
              </Grid.Row>
            </Grid>
            <StepWrapper innerRef={_stepWrapperRef} className='visibility' visibility={visibility}>
              <Label as='p' basic size='big' className='color__secondary'>
                <FormattedMessage {...messages.chooseStore} />
              </Label>
              <StepHead step='2'>
                <p><FormattedMessage {...messages.defaultStore} /></p>
              </StepHead>
              <LocationButton id='scrollToAnimate' className='color__secondary border__two--light-grey' onClick={_handleStoreLocator} iconBg={NextIcon}>
                {
                  store && isEmpty(store)
                  ? <FormattedMessage {...messages.findStore} />
                  : <span>{store.id} {store.name}</span>
                }
              </LocationButton>
            </StepWrapper>

            <BottomWrapper>
              <div className='discount-text'>
                <Label as='span' size='small' basic className='color__grey'>
                  <FormattedMessage {...messages.discountText} />
                </Label>
              </div>
              <ButtonContainer>
                <Button onClick={_handleProceed} primary loading={orderRequesting}>
                  <FormattedMessage {...messages.proceedNext} />
                </Button>
              </ButtonContainer>
            </BottomWrapper>

            <Modal
              open={modalToggle}
              name='warning'
              title={errorMessage}
              content=''
              close={_handleModalClose}
            />
          </ProductReviewWrapper>
        </div>
      </Container>
    )
  }
}

OrderSummary.propTypes = {

}

export default OrderSummary
