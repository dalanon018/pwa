/**
*
* OrderSummary
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import {
  T,
  allPass,
  always,
  complement,
  compose,
  cond,
  divide,
  equals,
  identity,
  ifElse,
  multiply,
  path,
  when,
 } from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

import NextIcon from 'images/icons/greater-than-icon.svg'
import ListCollapse from 'components/Shared/ListCollapse'
import Modal from 'components/Shared/PromptModal'
import RangeSlider from 'components/Shared/RangeSlider'

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
import {switchFn} from '../../../utils/logicHelper';

class OrderSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * we need to find a way if we already initialize our points else
   * we will be stuck on circular initialization
   */
  _pointsInitialized = false

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

  _getPointsEarn = (mode, amount) => {
    const { orderedProduct } = this.props
    return `${calculateEarnPoints({
      multiplier: parseFloat(orderedProduct.getIn(['points', 'multiplier'])),
      percentage: parseFloat(orderedProduct.getIn(['points', 'methods', mode])),
      amount: parseFloat(amount)
    })}`
  }

  _toggleOrigDiscountPrice = () => {
    const { orderedProduct } = this.props
    const showPrice = orderedProduct.get('discountPrice') || orderedProduct.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  _basePointsRequirementsUse = () => {
    return divide(this._computeTotalPointsPrice(), 2)
  }

  _computeTotalPointsPrice = () => {
    const { orderedProduct } = this.props
    const multiplier = orderedProduct.getIn(['points', 'multiplier'])
    return Math.ceil(multiply(this._toggleOrigDiscountPrice(), multiplier))
  }

  _isCurrentPointsHalfPricePoints = () => {
    const { currentPoints } = this.props
    return currentPoints >= this._basePointsRequirementsUse()
  }

  _computePricePoints = () => {
    const { orderedProduct, isDisabledPointsOptions } = this.props
    if (isDisabledPointsOptions) {
      // we dont need to recompute since we disable this one.
      return this._toggleOrigDiscountPrice()
    } else if (this._isCurrentPointsHalfPricePoints()) {
      return Math.ceil(divide(
        this._basePointsRequirementsUse(),
        orderedProduct.getIn(['points', 'multiplier'])
      ))
    } else {
      return 0
    }
  }

  _displayEarnPoints = (mode, amount) => {
    const { orderedProduct } = this.props
    if (orderedProduct.get('points')) {
      return (
        <Label as='p' basic size='large' className='color__secondary'>
          <FormattedMessage
            {...messages.earnedPoints}
            values={{points: <b>{this._getPointsEarn(mode, amount)}</b>}}
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

  _initialUpdateProps = () => {
    const { _updateUsePoints,isDisabledPointsOptions, currentPoints } = this.props
    const points = cond([
      [this._isCurrentPointsHalfPricePoints, this._basePointsRequirementsUse],
      [always(isDisabledPointsOptions), always(0)],
      [T, always(currentPoints)]
    ])()
    return _updateUsePoints(Math.ceil(points))
  }

  componentDidMount() {
    // when not yet initialize
    const initializeStartingUsePoints = when(
      equals(false),
      this._initialUpdateProps
    )
    initializeStartingUsePoints(this._pointsInitialized)
  }

  render () {
    const {
      usePoints,
      currentPoints,
      isDisabledPointsOptions,
      orderedProduct,
      orderRequesting,
      isBlackListed,
      productLoader,
      ShowCodComponent,
      errorMessage,
      modePayment,
      modalToggle,
      storeLocatorVisibility,
      pointsModifierVisibility,
      store,

      _updateUsePoints,
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

    const cashLabel = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashPrepaid} />
        </Label>
        { this._displayEarnPoints('cash', this._toggleOrigDiscountPrice()) }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice().length}>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice() }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    const codLabel = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashDelivery} />
        </Label>
        { this._displayEarnPoints('cod', this._toggleOrigDiscountPrice()) }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice().length}>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice() }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    const pointsLabel = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashPoints} />
        </Label>
        { this._displayEarnPoints('poc', this._computePricePoints()) }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._computePricePoints() }
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
                      label={codLabel}
                      checked={modePayment === 'COD'}
                      onChange={_handleChange}
                      onClick={_handleToBottom}
                    />
                    <StepWrapper innerRef={_stepWrapperRef} className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={storeLocatorVisibility}>
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
                      label={cashLabel}
                      checked={modePayment === 'CASH'}
                      onChange={_handleChange}
                    />
                    <Checkbox
                      radio
                      disabled={isDisabledPointsOptions}
                      className='margin__bottom-positive--20'
                      name='points'
                      value='POINTS'
                      label={pointsLabel}
                      checked={modePayment === 'POINTS'}
                      onChange={_handleChange}
                    />
                    <StepWrapper className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={pointsModifierVisibility}>
                      <Label as='p' basic size='big' className='color__secondary'>
                        <FormattedMessage {...messages.choosePointsTitle} />
                      </Label>
                      <Label as='span' basic size='large' className='color__secondary'>
                        <FormattedMessage {...messages.currentPoints} />
                        { currentPoints }
                      </Label>
                      <RangeSlider
                        usePoints={usePoints}
                        maxPoints={this._computeTotalPointsPrice()}
                        pointsModifier={_updateUsePoints}
                      />
                    </StepWrapper>
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
  currentPoints: PropTypes.number.isRequired,
  usePoints: PropTypes.number.isRequired,
  isDisabledPointsOptions: PropTypes.bool.isRequired,
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
  pointsModifierVisibility: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,

  _updateUsePoints: PropTypes.func.isRequired,
  _handleModalClose: PropTypes.func.isRequired,
  _handleProceed: PropTypes.func.isRequired,
  _handleStoreLocator: PropTypes.func.isRequired,
  _stepWrapperRef: PropTypes.func.isRequired,
  _handleToBottom: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
}

export default OrderSummary
