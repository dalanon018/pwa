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
  both,
  complement,
  compose,
  cond,
  divide,
  equals,
  identity,
  ifElse,
  lt,
  path,
  prop,
  subtract,
  when
} from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Label, Form, Checkbox, Image, Button, Container } from 'semantic-ui-react'

import NextIcon from 'images/icons/greater-than-icon.svg'
import MobileIcon from 'images/icons/order-summary/register.png'
import WalletIcon from 'images/icons/order-summary/payment-method.png'
import LocationIcon from 'images/icons/order-summary/select-store.png'
import CouponIcon from 'images/icons/order-summary/coupon.png'
import CliqqIcon from 'images/icons/cliqq.png'

import Modal from 'components/Shared/PromptModal'
// import ListCollapse from 'components/Shared/ListCollapse'
import PlainCard from 'components/Shared/PlainCard'
import SectionTitle from 'components/Shared/SectionTitle'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import RangeSlider from 'components/Shared/RangeSlider'
// import { LoadingStateImage } from 'components/Shared/LoadingBlock'

import { paramsImgix } from 'utils/image-stock'
import { priceStrikeThroughDisplay, toggleOrigDiscountPrice, computeTotalPointsPrice, calculatePricePoints } from 'utils/product'
import { calculateEarnPoints } from 'utils/calculation'
import { ToggleComponent } from 'utils/logicHelper'

import {
  PAYMENTS_OPTIONS
} from 'containers/Buckets/constants'

import messages from './messages'
import {
  // DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  MethodTitle,
  StepWrapper,
  LocationButton,
  CashPrepaidInfo,
  FullPointsWrapper,
  ProductPriceWrapper,
  FullPointsSideBarWrapper,
  ProductContainer,
  ProductDetails,
  LabelFullPointsPrice,
  BottomWrapper,
  LabelPrice,
  LabelTitle,
  BlockWrapper,
  InfoBlock,
  StoreLocatorRow,
  CouponContainer
} from './styles'

class OrderSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function+
  state = {
    toggleInfo: false,
    toggleTitle: '',
    mousePosition: 0,
    methodDescription: ''
  }
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
        <Label as='p' basic size='large' className='text__weight--400 margin__none'>
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

  _displayProductPointsPrice = ({ entity }) => {
    return (
      <FullPointsSideBarWrapper>
        <Image src={CliqqIcon} className='cliqq-plain-icon' alt='CLiQQ' />
        <Label as='b' basic size='big' className='product-price color__primary text__weight--700'>
          { computeTotalPointsPrice(entity) }
        </Label>
      </FullPointsSideBarWrapper>
    )
  }

  _displayProductPrice = ({ entity }) => {
    return (
      <ProductPriceWrapper>
        <Label className='padding__none base-price' as='b' basic size='massive' color='orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(entity) }
        </Label>
        { this._toggleDiscount(entity.get('discountPrice')) }
      </ProductPriceWrapper>
    )
  }

  _toggleFullPoints = ({ isFullPointsOnly, ...rest }) => {
    return ToggleComponent(
      this._displayProductPointsPrice(rest),
      this._displayProductPrice(rest)
    )(isFullPointsOnly)
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
      <Label as='span' basic size='big' className='strike text__weight--700 color__grey'>
        <FormattedMessage {...messages.peso} />
        { price && parseFloat(price).toLocaleString() }
      </Label>,
      null
    )

    // we should only trigger the toggling if it is not offline Product
    return !orderedProduct.get('offlineProduct') && discountedPrice((couponApplied) || discountPrice)
  }

  _showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  _handleShowMethodInfo = e => {
    const title = e.target.closest('div > .method-title > span') && e.target.closest('div > .method-title > span').innerText
    let infoClass

    switch (title) {
      case 'Cash on Delivery':
        infoClass = {
          topPosition: 0,
          infoDescription: messages.codDescription.defaultMessage,
          disableInfo: false
        }
        break
      case 'Cash Prepaid':
        infoClass = {
          topPosition: 105,
          infoDescription: messages.prepaidDescription.defaultMessage,
          disableInfo: false
        }
        break
      case 'Points & Cash':
        infoClass = {
          topPosition: 215,
          infoDescription: messages.pointsCashDescription.defaultMessage,
          disableInfo: false
        }
        break
      default:
        infoClass = {
          topPosition: 0,
          infoDescription: '',
          disableInfo: true
        }
        break
    }

    this.setState({
      toggleInfo: true,
      toggleTitle: infoClass.disableInfo ? null : title,
      mousePosition: infoClass.topPosition,
      methodDescription: infoClass.infoDescription
    })
  }

  _handleHideMethodInfo = () => this.setState({toggleInfo: false})

  _handleMethodInfoBlock = (title, description) => {
    const { toggleInfo, toggleTitle, mousePosition, methodDescription } = this.state
    // return false
    if (toggleInfo && toggleTitle) {
      return (
        <InfoBlock top={mousePosition}>
          <Label as='p' basic size='large' className='text__weight--700 margin__bottom-positive--5'>
            <FormattedMessage
              {...messages.whatIs}
              values={{title: toggleTitle}}
            />
          </Label>
          <Label as='p' basic size='large' className='text__weight--400 color__grey margin__bottom-positive--5'>
            {methodDescription}
          </Label>
        </InfoBlock>
      )
    }
  }

  _renderRegularPaymentOptions = ({ mode, label }) => {
    const { orderedProduct } = this.props
    return (
      <label
        className='label-custom'
        onMouseOver={e => this._handleShowMethodInfo(e)}
        onMouseOut={this._handleHideMethodInfo}>
        <LabelTitle>
          <Label as='p' basic size='big' className='text__weight--500 margin__none method-title'>
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
      <label
        className='label-custom'
        onMouseOver={e => this._handleShowMethodInfo(e)}
        onMouseOut={this._handleHideMethodInfo}>
        <LabelTitle>
          <Label as='p' basic size='big' className='text__weight--500 margin__none method-title'>
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
      <label
        className='label-custom'
        onMouseOver={e => this._handleShowMethodInfo(e)}
        onMouseOut={this._handleHideMethodInfo}>
        <LabelTitle>
          <Label as='p' basic size='big' className='text__weight--500 margin__none method-title'>
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
      modalIcon,
      modalContent,
      modalMessage,
      orderedProduct,
      modalToggle,
      orderRequesting,
      store,
      storeLocatorVisibility,
      intl,
      mobileNumbers,
      pointsModifierVisibility,
      currentPoints,
      usePoints,

      couponLoader,
      couponCode,
      couponApplied,

      _isFullPointsOnly,
      _updateUsePoints,
      _handleModalClose,
      _handleProceed,
      _handleStoreLocator,
      _stepWrapperRef,
      _handleCouponEntry,
      _handleSubmitCoupon,
      _handleRemoveCoupon
    } = this.props

    return (
      <div>
        <Container>
          <Grid padded>
            <Grid.Row className='padding__bottom--none'>
              <Grid.Column>
                <SectionTitle colorGrey title={intl.formatMessage(messages.orderSummary)} />
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
                      <div className='width__full'>
                        <Label as='p' className='margin__top-positive--15 margin__bottom-positive--15 text__weight--500' size='huge'>
                          <FormattedMessage {...messages.methodPayment} />
                        </Label>
                        <Label as='p' className='text__weight--400' size='large'>
                          <FormattedMessage {...messages.earnPoints} />
                        </Label>
                        <SelectMethodWrapper checkHeight={orderedProduct.get('discountPrice') !== 0}>
                          <Form>
                            <div className='payment-wrapper position__relative'>
                              <Grid>
                                <Grid.Row columns={2}>
                                  <Grid.Column width={9}>
                                    { this._displayPaymentOptions() }
                                  </Grid.Column>
                                  <Grid.Column width={7}>
                                    { this._handleMethodInfoBlock() }
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>

                              <StepWrapper className='visibility' visibility={pointsModifierVisibility}>
                                <Label as='p' className='color__grey text__weight--500' size='big' >
                                  <FormattedMessage {...messages.choosePointsTitle} />
                                </Label>
                                <Label as='p' className='margin__none text__weight--400' size='large'>
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
                            </div>
                          </Form>
                        </SelectMethodWrapper>
                      </div>
                    </BlockWrapper>
                  </PlainCard>
                </Grid.Row>
                <StoreLocatorRow className='margin__bottom-positive--20' visibility={storeLocatorVisibility}>
                  <PlainCard borderRadius alignLeft>
                    <BlockWrapper>
                      <div>
                        <Image className='icon' src={LocationIcon} alt='CLiQQ' />
                      </div>
                      <div>
                        <Label as='p' className='margin__top-positive--15 margin__bottom-positive--15 text__weight--500' size='huge'>
                          <FormattedMessage {...messages.chooseStore} />
                        </Label>
                        {
                          storeLocatorVisibility &&
                          <Label as='p' className='text__weight--400 margin__bottom-positive--20' size='large'>
                            <FormattedMessage {...messages.defaultStore} />
                          </Label>
                        }

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
                        <CashPrepaidInfo className='visibility' visibility={storeLocatorVisibility}>
                          <Label as='span' className='text__weight--700' basic size='large'>
                            <FormattedMessage {...messages.payAtAny} />
                          </Label>
                        </CashPrepaidInfo>
                        {/*
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
                        */}
                      </div>
                    </BlockWrapper>
                  </PlainCard>
                </StoreLocatorRow>
                <Grid.Row className='margin__bottom-positive--20'>
                  <PlainCard borderRadius alignLeft>
                    <BlockWrapper>
                      <div>
                        <Image className='icon' src={CouponIcon} alt='CLiQQ' />
                      </div>
                      <CouponContainer>
                        <Label as='p' className='margin__top-positive--15 margin__bottom-positive--15 text__weight--500' size='huge'>
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
                              placeholder='Enter Code here'
                              name='coupon'
                              className='custom-input' />
                            <Button
                              disabled={(couponCode.length === 0) || couponLoader}
                              loading={couponLoader}
                              className='background__teal color__white'
                              content={
                                couponApplied
                                  ? <FormattedMessage {...messages.couponButtonLabelRemove} />
                                  : <FormattedMessage {...messages.couponButtonLabelApply} />
                              }
                            />
                          </Form.Group>
                        </Form>
                      </CouponContainer>
                    </BlockWrapper>
                  </PlainCard>
                </Grid.Row>
                <BottomWrapper>
                  <ButtonContainer>
                    <Button onClick={_handleProceed} primary loading={orderRequesting}>
                      <FormattedMessage {...messages.proceedNext} />
                    </Button>
                  </ButtonContainer>
                </BottomWrapper>
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

                        {
                          this._toggleFullPoints({
                            isFullPointsOnly: _isFullPointsOnly,
                            entity: orderedProduct
                          })
                        }

                        {
                          orderedProduct.get('size') &&
                          <Label as='p' basic size='big' className='text__weight--400 padding__horizontal--15'>
                            <FormattedMessage {...messages.size} />
                            {orderedProduct.get('size')}
                          </Label>
                        }

                      </ProductDetails>
                    </ProductContainer>

                    {/*
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
                    */}
                  </div>
                </PlainCard>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Modal
          open={modalToggle}
          name={modalIcon}
          title={modalMessage}
          content={modalContent}
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
  couponCode: PropTypes.string,
  couponApplied: PropTypes.bool.isRequired,
  couponLoader: PropTypes.bool.isRequired,
  modalIcon: PropTypes.string.isRequired,
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
  store: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  mobileNumbers: PropTypes.object.isRequired,

  _handleModalClose: PropTypes.func.isRequired,
  _handleProceed: PropTypes.func.isRequired,
  _handleStoreLocator: PropTypes.func.isRequired,
  _stepWrapperRef: PropTypes.func.isRequired,
  _handleToBottom: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
}

export default OrderSummary
