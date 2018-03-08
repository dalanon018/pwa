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
import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

import NextIcon from 'images/icons/greater-than-icon.svg'
import ListCollapse from 'components/Shared/ListCollapse'
import Modal from 'components/Shared/PromptModal'
import { LoadingStateImage } from 'components/Shared/LoadingBlock'

import { paramsImgix } from 'utils/image-stock'
import { calculateEarnPoints } from 'utils/calculation'

import messages from './messages'
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
  CustomGrid,
  LabelPrice,
  LabelTitle
} from './styles'

class OrderSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

  _getHighestPointsEarn = (mode) => {
    const { orderedProduct } = this.props
    const amount = orderedProduct.get('discountPrice') || orderedProduct.get('price')
    return `${calculateEarnPoints({
      multiplier: parseFloat(orderedProduct.getIn(['points', 'multiplier'])),
      percentage: parseFloat(orderedProduct.getIn(['points', 'methods', mode])),
      amount: parseFloat(amount)
    })}`
  }

  _toggleOrigDiscountPrice = (product) => {
    const showPrice = product.get('discountPrice') || product.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  _displayEarnPoints = (mode) => {
    const { orderedProduct } = this.props
    if (orderedProduct.get('points')) {
      return (
        <Label as='p' basic size='large' className='color__secondary'>
          <FormattedMessage
            {...messages.earnedPoints}
            values={{points: <b>{this._getHighestPointsEarn(mode)}</b>}}
          />
        </Label>
      )
    }

    return null
  }

  _showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  render () {
    const {
      orderedProduct,
      orderRequesting,
      isBlackListed,
      productLoader,
      ShowCodComponent,
      errorMessage,
      modePayment,
      modalToggle,
      visibility,
      store,

      _handleModalClose,
      _handleProceed,
      _handleStoreLocator,
      _stepWrapperRef,
      _handleToBottom,
      _handleChange
    } = this.props

    const toggleDiscount = this._showDiscountPrice(
      <span className='strike color__grey'>
        <FormattedMessage {...messages.peso} />
        { orderedProduct.get('price') &&
          parseFloat(orderedProduct.get('price')).toLocaleString() }
      </span>,
      null
    )

    const labelOne = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashPrepaid} />
        </Label>
        { this._displayEarnPoints('cash') }
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
        { this._displayEarnPoints('cod') }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    const brandLogo = orderedProduct.get('brandLogo') ? (
      <Image
        className='brand-logo'
        alt='CLiQQ'
        src={this._updateParamsImages(orderedProduct.get('brandLogo'), { w: 200, h: 30 })} />) : ''

    return (
      <ProductReviewWrapper>
        { productLoader || brandLogo }
        <LoadingStateImage loading={productLoader} center>
          <ProductItem>
            <Image alt='CLiQQ' src={this._updateParamsImages(orderedProduct.get('image'))} />
            {
              orderedProduct.get('brand')
              ? <Label as='span' basic size='big' className='color__secondary'>{orderedProduct.getIn(['brand', 'name'])}</Label>
              : null
            }
            <Label as='p' basic size='big' className='color__secondary'>{orderedProduct.get('title')}</Label>
          </ProductItem>
        </LoadingStateImage>
        <ListCollapse title={
          <Label as='p' className='margin__none color__secondary' size='large'>
            <FormattedMessage {...messages.viewDetails} />
          </Label>
        }>
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
        <CustomGrid>
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
                  <Form.Field>
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
                    <StepWrapper innerRef={_stepWrapperRef} className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={visibility}>
                      <Label as='p' basic size='big' className='color__secondary'>
                        <FormattedMessage {...messages.chooseStore} />
                      </Label>
                      <StepHead step='2'>
                        <p><FormattedMessage {...messages.defaultStore} /></p>
                      </StepHead>
                      <LocationButton id='scrollToAnimate' className='color__secondary border__two--light-grey' onClick={_handleStoreLocator} fluid iconBg={NextIcon}>
                        {
                        store && isEmpty(store)
                        ? <FormattedMessage {...messages.findStore} />
                        : <span>{store.id} {store.name}</span>
                      }
                      </LocationButton>
                    </StepWrapper>
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
                </Form>
              </SelectMethodWrapper>
            </Grid.Row>
          </Grid>
        </CustomGrid>

        <ButtonContainer>
          <Button onClick={_handleProceed} primary fluid loading={orderRequesting}>
            <FormattedMessage {...messages.proceedNext} />
          </Button>
        </ButtonContainer>

        <Modal
          open={modalToggle}
          name='warning'
          title={errorMessage}
          content=''
          close={_handleModalClose}
        />
      </ProductReviewWrapper>
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
  visibility: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,

  _handleModalClose: PropTypes.func.isRequired,
  _handleProceed: PropTypes.func.isRequired,
  _handleStoreLocator: PropTypes.func.isRequired,
  _stepWrapperRef: PropTypes.func.isRequired,
  _handleToBottom: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
}

export default OrderSummary
