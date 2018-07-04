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
  equals,
  allPass,
  always,
  both,
  complement,
  compose,
  cond,
  divide,
  identity,
  ifElse,
  lt,
  path,
  prop,
  subtract,
  when
 } from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

import NextIcon from 'images/icons/goto-icon.svg'
import ListCollapse from 'components/Shared/ListCollapse'
import Modal from 'components/Shared/PromptModal'
import RangeSlider from 'components/Shared/RangeSlider'
import RibbonWrapper from 'components/Shared/RibbonWrapper'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import { LoadingStateImage } from 'components/Shared/LoadingBlock'

import CliqqIcon from 'images/icons/cliqq.png'
import LocationIcon from 'images/icons/location-icon.svg'

import { paramsImgix } from 'utils/image-stock'
import { calculateEarnPoints } from 'utils/calculation'
import { priceStrikeThroughDisplay, toggleOrigDiscountPrice, computeTotalPointsPrice, calculatePricePoints } from 'utils/product'
import { ToggleComponent } from 'utils/logicHelper'

import {
  PAYMENTS_OPTIONS
} from 'containers/Buckets/constants'

import messages from './messages'
import {
  DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  ProductReviewWrapper,
  MethodTitle,
  StepWrapper,
  // StepHead,
  LocationButton,
  CustomGrid,
  LabelPrice,
  LabelFullPointsPrice,
  FullPointsWrapper,
  LabelTitle,
  CouponContainer
} from './styles'

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
      multiplier: orderedProduct.getIn(['points', 'multiplier']),
      method: orderedProduct.getIn(['points', 'method', mode]).toObject(),
      amount: amount
    })}`
  }

  _toggleOrigDiscountPrice = () => {
    const { orderedProduct } = this.props
    return toggleOrigDiscountPrice(orderedProduct)
  }

  _basePointsRequirementsUse = () => {
    return divide(this._computeTotalPointsPrice(), 2)
  }

  _computeTotalPointsPrice = (props = this.props) => {
    const { orderedProduct } = props
    return computeTotalPointsPrice(orderedProduct)
  }

  _isCurrentPointsHalfPricePoints = () => {
    const { currentPoints } = this.props
    return currentPoints >= this._basePointsRequirementsUse()
  }

  _computePricePoints = () => {
    const { orderedProduct, isDisabledPointsOptions, usePoints } = this.props
    if (isDisabledPointsOptions) {
      // we dont need to recompute since we disable this one.
      return this._toggleOrigDiscountPrice()
    } else {
      return calculatePricePoints({
        product: orderedProduct,
        usePoints
      })
    }
  }

  _displayEarnPoints = (mode, amount) => {
    const { orderedProduct } = this.props
    if (orderedProduct.get('points')) {
      return (
        <Label as='p' basic size='medium' className='text__weight--400 margin__none'>
          <FormattedMessage
            {...messages.earnedPoints}
            values={{
              points: <b>{this._getPointsEarn(mode, amount)}</b>,
              icon: <Image src={CliqqIcon} className='cliqq-plain-icon' alt='CLiQQ' />
            }}
          />
        </Label>
      )
    }

    return null
  }

  // Make sure we accept that the current props has the values.
  // TODO: Make sure that we refactor this one and find a way that functions are not bind to this class
  _initialUpdateProps = () => {
    const { _updateUsePoints, isDisabledPointsOptions, currentPoints } = this.props
    const points = cond([
      [this._isCurrentPointsHalfPricePoints, this._basePointsRequirementsUse],
      [always(isDisabledPointsOptions), always(0)],
      [T, always(currentPoints)]
    ])()
    this._pointsInitialized = true
    return _updateUsePoints(Math.ceil(points))
  }

  _toggleDiscount = (discountPrice) => {
    const { orderedProduct, couponApplied } = this.props
    const price = priceStrikeThroughDisplay({
      discountPrice,
      couponApplied,
      product: orderedProduct,
      computedPrice: this._computePricePoints()
    })

    const discountedPrice = ToggleComponent(
      <span className='strike color__grey'>
        <FormattedMessage {...messages.peso} />
        { price && parseFloat(price).toLocaleString() }
      </span>,
      null
    )

    return discountedPrice(couponApplied || discountPrice)
  }

  _renderRegularPaymentOptions = ({ mode, label }) => {
    const { orderedProduct } = this.props
    return (
      <label className='label-custom'>
        <LabelTitle>
          <Label as='p' basic size='large' className='text__weight--500 margin__bottom-positive--5'>
            <FormattedMessage {...messages[label]} />
          </Label>
          { this._displayEarnPoints(mode, this._toggleOrigDiscountPrice()) }
        </LabelTitle>
        <LabelPrice length={this._toggleOrigDiscountPrice().length}>
          <Label as='p' basic size='massive' className='text__weight--700 margin__none color__primary total'>
            <FormattedMessage {...messages.peso} />
            { this._toggleOrigDiscountPrice().toLocaleString() }
          </Label>
          { this._toggleDiscount(orderedProduct.get('discountPrice')) }
        </LabelPrice>
      </label>
    )
  }

  _renderPointsCashPaymentOptions = ({ mode = 'poc' } = {}) => {
    const { orderedProduct } = this.props
    return (
      <label className='label-custom'>
        <LabelTitle>
          <Label as='p' basic size='large' className='text__weight--500 margin__bottom-positive--5'>
            <FormattedMessage {...messages.cashPoints} />
          </Label>
          { this._displayEarnPoints(mode, this._computePricePoints()) }
        </LabelTitle>
        <LabelPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
          <Label as='p' basic size='massive' className='text__weight--700 margin__none color__primary total'>
            <FormattedMessage {...messages.peso} />
            { this._computePricePoints().toLocaleString() }
          </Label>
          { this._toggleDiscount(orderedProduct.get('discountPrice')) }
        </LabelPrice>
      </label>
    )
  }

  _renderFullPointsPaymentOptions = () => {
    const { orderedProduct } = this.props
    return (
      <label className='label-custom'>
        <LabelTitle>
          <Label as='p' basic size='large' className='text__weight--500 margin__none'>
            <FormattedMessage {...messages.fullPoints} />
          </Label>
        </LabelTitle>
        <LabelFullPointsPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
          <FullPointsWrapper>
            <Image src={CliqqIcon} className='cliqq-plain-icon' alt='CLiQQ' />
            <Label as='p' basic size='massive' className='text__weight--700 margin__none color__primary total'>
              { this._computeTotalPointsPrice().toLocaleString() }
            </Label>
          </FullPointsWrapper>
        </LabelFullPointsPrice>
      </label>
    )
  }

  _codCheckOptionFactory = () => {
    const { ShowCodComponent, isBlackListed, modePayment, _handleChange, _handleToBottom, _isFullPointsOnly } = this.props
    return ToggleComponent(
      <ShowCodComponent
        radio
        isBlackListed={isBlackListed}
        name='cod'
        value={PAYMENTS_OPTIONS.COD}
        label={this._renderRegularPaymentOptions({ mode: 'cod', label: 'cashDelivery' })}
        checked={modePayment === PAYMENTS_OPTIONS.COD}
        onChange={_handleChange}
        onClick={_handleToBottom}
      />,
      null
    )(!_isFullPointsOnly)
  }

  _cashCheckOptionFactory = () => {
    const { modePayment, _handleChange, _isFullPointsOnly } = this.props
    return ToggleComponent(
      <Checkbox
        radio
        className='margin__vertical--10'
        name='cash-prepaid'
        value={PAYMENTS_OPTIONS.CASH}
        label={this._renderRegularPaymentOptions({ mode: 'cash', label: 'cashPrepaid' })}
        checked={modePayment === PAYMENTS_OPTIONS.CASH}
        onChange={_handleChange}
      />,
      null
    )(!_isFullPointsOnly)
  }

  _pointsCashCheckOptionFactory = () => {
    const { isDisabledPointsOptions, modePayment, _handleChange, _isFullPointsOnly } = this.props

    return ToggleComponent(
      <Checkbox
        radio
        disabled={isDisabledPointsOptions}
        className='margin__bottom-positive--20'
        name='points'
        value={PAYMENTS_OPTIONS.POINTS}
        label={this._renderPointsCashPaymentOptions()}
        checked={modePayment === PAYMENTS_OPTIONS.POINTS}
        onChange={_handleChange}
      />,
      null
    )(!_isFullPointsOnly)
  }

  _disabledFullPointsOption = (props = this.props) => {
    const { currentPoints } = props
    return lt(currentPoints, this._computeTotalPointsPrice(props))
  }

  _fullPointsCheckOptionFactory = () => {
    const { modePayment, _handleChange, _isFullPointsOnly } = this.props

    return ToggleComponent(
      <Checkbox
        radio
        disabled={this._disabledFullPointsOption()}
        className='margin__bottom-positive--20'
        name='fullPoints'
        value={PAYMENTS_OPTIONS.FULL_POINTS}
        label={this._renderFullPointsPaymentOptions()}
        checked={modePayment === PAYMENTS_OPTIONS.FULL_POINTS}
        onChange={_handleChange}
      />,
      null
    )(_isFullPointsOnly)
  }

  /**
   * for better UX we will only display payment options if order product is already available
   */
  _displayPaymentOptions = () => {
    const { orderedProduct } = this.props
    return ToggleComponent(
      <div>
        { this._codCheckOptionFactory() }
        { this._cashCheckOptionFactory() }
        { this._pointsCashCheckOptionFactory() }
        { this._fullPointsCheckOptionFactory() }
      </div>,
      this._displayLoader()
    )(!!orderedProduct.size)
  }

  _displayLoader = () => {
    return (
      <LoadingIndicator />
    )
  }

  _handleFullPointsFunctionTrigger = (trueFn, falseFn) => ifElse(
    both(identity, () => this.props._isFullPointsOnly),
    trueFn,
    falseFn
  )

  _handleProceedFactory = () => {
    const { _handleProceed, _handleNotEnoughFullPointsProceed } = this.props

    const handleSubmission = this._handleFullPointsFunctionTrigger(
      _handleNotEnoughFullPointsProceed,
      _handleProceed
    )

    return handleSubmission(this._disabledFullPointsOption())
  }

  _handleCloseModalFactory = () => {
    const { _handleModalClose, _handleNotEnoughFullPointsCloseModal } = this.props
    const handleSubmission = this._handleFullPointsFunctionTrigger(
      _handleNotEnoughFullPointsCloseModal,
      _handleModalClose
    )
    return handleSubmission(this._disabledFullPointsOption())
  }

  _displayCurrentPointsFullPoints = () => {
    const { currentPoints, _isFullPointsOnly } = this.props
    return ToggleComponent(
      <MethodTitle>
        <Label as='p' className='margin__none text__weight--400' size='medium'>
          <FormattedMessage {...messages.currentPoints} />
          <Image src={CliqqIcon} className='cliqq-plain-icon' alt='CLiQQ' />
          { currentPoints }
        </Label>
      </MethodTitle>,
      null
    )(_isFullPointsOnly)
  }

  _checkShouldUpdateUsePoints = (props) => {
    const usePoints = prop('usePoints')
    const maxPoints = this._computeTotalPointsPrice(props)

    const shouldUpdateUsePoints = when(
      compose(lt(maxPoints), usePoints),
      () => props._updateUsePoints(maxPoints)
    )

    shouldUpdateUsePoints(props)
  }

  componentWillReceiveProps (nextProps) {
    const { couponApplied } = this.props
    // when not yet initialize
    const initializeStartingUsePoints = when(
      allPass([
        () => !this._pointsInitialized,
        compose(
          lt(0),
          prop('currentPoints')
        ),
        compose(
          lt(0),
          path(['orderedProduct', 'size'])
        )
      ]),
      this._initialUpdateProps
    )

    const shouldSelectFullPoints = when(
      compose(both(complement(this._disabledFullPointsOption), prop('_isFullPointsOnly'))),
      (props) => {
        // if enabled need to make sure that usePoints should be update
        props._handleChange(null, { value: PAYMENTS_OPTIONS.FULL_POINTS })
        props._updateUsePoints(this._computeTotalPointsPrice(props))
      }
    )

    const updateUsePointsOnPromoApplied = when(
      compose(complement, equals(couponApplied), prop('couponApplied')),
      this._checkShouldUpdateUsePoints
    )
    // we will be using this.props since we are having issue with other deps that use the this.props
    initializeStartingUsePoints(this.props)
    shouldSelectFullPoints(nextProps)
    updateUsePointsOnPromoApplied(nextProps)
  }

  render () {
    const {
      usePoints,
      currentPoints,
      orderedProduct,
      orderRequesting,
      productLoader,

      modalIcon,
      modalMessage,
      modalContent,
      modalToggle,

      storeLocatorVisibility,
      pointsModifierVisibility,
      store,
      couponCode,
      couponApplied,
      couponLoader,

      _isFullPointsOnly,
      _updateUsePoints,
      _handleStoreLocator,
      _handleRecentStore,
      _stepWrapperRef,
      _handleCouponEntry,
      _handleSubmitCoupon,
      _handleRemoveCoupon
    } = this.props

    const brandLogo = orderedProduct.get('brandLogo') ? (
      <Image
        className='brand-logo'
        alt='CLiQQ'
        src={this._updateParamsImages(orderedProduct.get('brandLogo'), { w: 200, h: 30 })} />) : ''
    return (
      <ProductReviewWrapper>
        <div className='background__white box__shadow--primary padding__bottom--20'>
          { productLoader || brandLogo }
          <LoadingStateImage loading={productLoader} center>
            <ProductItem>
              <div className='padding__vertical--20'>
                <div className='position__relative'>
                  {
                    orderedProduct.get('discountInfo') &&
                    <RibbonWrapper rightSpace percentage={orderedProduct.get('discountInfo')} />
                  }
                  <Image className='slick-image-handler' alt='CLiQQ' src={this._updateParamsImages(orderedProduct.get('image'))} />
                </div>
              </div>
              {
                orderedProduct.get('brand')
                ? <Label className='no-margin-bottom color__grey margin__none' as='p' basic size='large'>{orderedProduct.getIn(['brand', 'name'])}</Label>
                : null
              }
              <Label className='padding__horizontal--15' as='p' basic size='big'>{orderedProduct.get('title')}</Label>
            </ProductItem>
          </LoadingStateImage>
          <ListCollapse title={
            <Label as='p' className='margin__none color__grey text__weight--500' size='large' >
              <FormattedMessage {...messages.viewDetails} />
            </Label>
          }>
            <DetailsWrapper>
              <Label className='padding__none text__weight--500' as='span' basic size='medium'>
                <FormattedMessage {...messages.productDetailsTitle} />
              </Label>
              <div className='margin__bottom-positive--10' dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
              {/* <div className='sub-title color__secondary'>
                <FormattedMessage {...messages.productDeliveryTitle} />
              </div>
              <div dangerouslySetInnerHTML={{__html: orderedProduct.get('deliveryPromiseMessage')}} /> */}
            </DetailsWrapper>
          </ListCollapse>
        </div>
        <div className='background__white box__shadow--primary margin__top-positive--10'>
          <CustomGrid>
            <Grid padded>
              <Grid.Row>
                <MethodTitle>
                  <Label as='p' className='color__grey text__weight--500' size='large' >
                    <FormattedMessage {...messages.methodPayment} />
                  </Label>
                  <Label as='p' className='margin__none text__weight--400' size='medium'>
                    <FormattedMessage {...messages[_isFullPointsOnly ? 'pointsOnlyTip' : 'pointsTip']} />
                  </Label>
                </MethodTitle>
                { this._displayCurrentPointsFullPoints() }
              </Grid.Row>
              <Grid.Row>
                <SelectMethodWrapper checkHeight={orderedProduct.get('discountPrice') !== 0}>
                  <Form>
                    <Form.Field>
                      { this._displayPaymentOptions() }

                      <StepWrapper className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={pointsModifierVisibility}>
                        <Label as='p' className='color__grey text__weight--500' size='large' >
                          <FormattedMessage {...messages.choosePointsTitle} />
                        </Label>
                        <Label as='p' className='margin__none text__weight--400' size='medium'>
                          <FormattedMessage {...messages.currentPoints} />
                          <Image src={CliqqIcon} className='cliqq-plain-icon' alt='CLiQQ' />
                          { subtract(currentPoints, usePoints) }
                        </Label>
                        <RangeSlider
                          usePoints={usePoints}
                          maxPoints={this._computeTotalPointsPrice()}
                          pointsModifier={_updateUsePoints}
                          currentPoints={currentPoints}
                        />
                      </StepWrapper>

                      <StepWrapper innerRef={_stepWrapperRef} className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={storeLocatorVisibility}>
                        <Label as='p' className='color__grey text__weight--500' size='large' >
                          <FormattedMessage {...messages.chooseStore} />
                        </Label>
                        <LocationButton id='scrollToAnimate' onClick={_handleRecentStore} className='color__secondary border__two--light-grey' fluid nextIcon={NextIcon} locationIcon={LocationIcon}>
                          {
                            store && isEmpty(store)
                            ? <span className='margin__left-positive--20'>
                              <Label as='span' className='text__weight--500' size='large' >
                                <FormattedMessage {...messages.recentlyViewedStore} />
                              </Label>
                            </span>
                            : <span className='margin__left-positive--20'>
                              <Label as='span' className='text__weight--500' size='large' >
                                {store.id} {store.name}
                              </Label>
                            </span>
                          }
                        </LocationButton>
                        <Label as='p' className='margin__none text__weight--400 margin__top-positive--10' size='medium'>
                          <FormattedMessage
                            {...messages.findStore}
                            values={{storeLocator: (
                              <span className='color__primary' onClick={_handleStoreLocator}>
                                <FormattedMessage
                                  {...messages.storeLocator}
                                />
                              </span>
                            )}}
                          />
                        </Label>
                      </StepWrapper>
                    </Form.Field>
                  </Form>
                </SelectMethodWrapper>
              </Grid.Row>
            </Grid>
          </CustomGrid>
        </div>

        <CouponContainer className='background__white box__shadow--primary margin__top-positive--10'>
          <CustomGrid>
            <Grid padded>
              <Grid.Row>
                <Grid.Column className='padding__horizontal--14'>
                  <Label as='p' className='color__grey text__weight--500' size='large' >
                    {
                      couponApplied && couponCode.length >= 1
                      ? <FormattedMessage {...messages.couponAppliedLabel} />
                      : <FormattedMessage {...messages.addCouponCodeLabel} />
                    }
                  </Label>
                  <Form onSubmit={couponApplied ? _handleRemoveCoupon : _handleSubmitCoupon}>
                    <Form.Group>
                      <Form.Input
                        value={couponCode}
                        disabled={((couponApplied && couponCode.length >= 1) || couponLoader)}
                        onChange={e => _handleCouponEntry(e)}
                        width={9}
                        placeholder='Enter Code here'
                        name='coupon'
                        className='custom-input' />
                      <Button
                        disabled={(couponCode.length === 0) || couponLoader}
                        loading={couponLoader}
                        content={
                          couponApplied
                          ? <FormattedMessage {...messages.couponButtonLabelRemove} />
                          : <FormattedMessage {...messages.couponButtonLabelApply} />
                        }
                        className='background__teal color__white'
                      />
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </CustomGrid>
        </CouponContainer>

        <ButtonContainer>
          <Button onClick={this._handleProceedFactory} primary fluid loading={orderRequesting} className='text__weight--700'>
            <FormattedMessage {...messages.proceedNext} />
          </Button>
        </ButtonContainer>

        <Modal
          open={modalToggle}
          name={modalIcon}
          title={modalMessage}
          content={modalContent}
          close={this._handleCloseModalFactory}
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
  modalIcon: PropTypes.string.isRequired,
  couponCode: PropTypes.string,
  couponApplied: PropTypes.bool.isRequired,
  couponLoader: PropTypes.bool.isRequired,
  modalMessage: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  modalContent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  modePayment: PropTypes.string.isRequired,
  modalToggle: PropTypes.bool.isRequired,
  storeLocatorVisibility: PropTypes.bool.isRequired,
  pointsModifierVisibility: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,

  _isFullPointsOnly: PropTypes.bool.isRequired,
  _updateUsePoints: PropTypes.func.isRequired,
  _handleModalClose: PropTypes.func.isRequired,
  _handleProceed: PropTypes.func.isRequired,
  _handleNotEnoughFullPointsProceed: PropTypes.func.isRequired,
  _handleNotEnoughFullPointsCloseModal: PropTypes.func.isRequired,
  _handleStoreLocator: PropTypes.func.isRequired,
  _handleRecentStore: PropTypes.func.isRequired,
  _stepWrapperRef: PropTypes.func.isRequired,
  _handleToBottom: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
}

export default OrderSummary
