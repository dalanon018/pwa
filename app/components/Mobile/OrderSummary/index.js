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
  compose,
  cond,
  divide,
  identity,
  ifElse,
  multiply,
  subtract,
  path,
  prop,
  when,
  lt
 } from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

import NextIcon from 'images/icons/goto-icon.svg'
import ListCollapse from 'components/Shared/ListCollapse'
import Modal from 'components/Shared/PromptModal'
import RangeSlider from 'components/Shared/RangeSlider'

import { LoadingStateImage } from 'components/Shared/LoadingBlock'

import PlainCliqqPlain from 'images/icons/plain-cliqq-icon.svg'
import LocationIcon from 'images/icons/location-icon.svg'

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
  // StepHead,
  LocationButton,
  CustomGrid,
  LabelPrice,
  LabelTitle
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
      multiplier: parseFloat(orderedProduct.getIn(['points', 'multiplier'])),
      percentage: parseFloat(orderedProduct.getIn(['points', 'method', mode])),
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
    const { orderedProduct, isDisabledPointsOptions, usePoints } = this.props
    if (isDisabledPointsOptions) {
      // we dont need to recompute since we disable this one.
      return this._toggleOrigDiscountPrice()
    } else {
      const calculate = Math.floor(divide(
        subtract(this._computeTotalPointsPrice(), usePoints),
        orderedProduct.getIn(['points', 'multiplier'])
      ))
      // make sure not NAN
      return calculate || 0
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
              icon: <Image src={PlainCliqqPlain} className='cliqq-plain-icon' alt='CLiQQ' />
            }}
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

  componentWillReceiveProps (nextProps) {
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
    // we will be using this.props since we are having issue with other deps that use the this.props
    initializeStartingUsePoints(this.props)
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
      _handleRecentStore,
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
        <Label as='p' basic size='large' className='text__weight--500 margin__bottom-positive--5'>
          <FormattedMessage {...messages.cashPrepaid} />
        </Label>
        { this._displayEarnPoints('cash', this._toggleOrigDiscountPrice()) }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice().length}>
        <Label as='p' basic size='massive' className='text__weight--700 margin__none color__primary total'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice() }
        </Label>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    const codLabel = <label className='label-custom'>
      <LabelTitle>
        <Label as='p' basic size='large' className='text__weight--500 margin__bottom-positive--5'>
          <FormattedMessage {...messages.cashDelivery} />
        </Label>
        { this._displayEarnPoints('cod', this._toggleOrigDiscountPrice()) }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice().length}>
        <Label as='p' basic size='massive' className='text__weight--700 margin__none color__primary total'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice() }
        </Label>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>

    const pointsLabel = <label className='label-custom'>
      <LabelTitle>
        <Label as='p' basic size='large' className='text__weight--500 margin__bottom-positive--5'>
          <FormattedMessage {...messages.cashPoints} />
        </Label>
        { this._displayEarnPoints('poc', this._computePricePoints()) }
      </LabelTitle>
      <LabelPrice length={this._toggleOrigDiscountPrice(orderedProduct).length}>
        <Label as='p' basic size='massive' className='text__weight--700 margin__none color__primary total'>
          <FormattedMessage {...messages.peso} />
          { this._computePricePoints() }
        </Label>
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
              ? <Label className='no-margin-bottom color__grey' as='p' basic size='large'>{orderedProduct.getIn(['brand', 'name'])}</Label>
              : null
            }
            <Label as='p' basic size='big'>{orderedProduct.get('title')}</Label>
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
            <div className='sub-title color__secondary'>
              <FormattedMessage {...messages.productDeliveryTitle} />
            </div>
            <div dangerouslySetInnerHTML={{__html: orderedProduct.get('deliveryPromiseMessage')}} />
          </DetailsWrapper>
        </ListCollapse>
        <CustomGrid>
          <Grid padded>
            <Grid.Row>
              <MethodTitle>
                <Label as='p' className='color__grey text__weight--500' size='large' >
                  <FormattedMessage {...messages.methodPayment} />
                </Label>
                <Label as='p' className='margin__none text__weight--400' size='medium'>
                  <FormattedMessage {...messages.pointsTip} />
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
                    <Checkbox
                      radio
                      className='margin__vertical--10'
                      name='cash-prepaid'
                      value='CASH'
                      label={cashLabel}
                      checked={modePayment === 'CASH'}
                      onChange={_handleChange}
                    />
                    {
                      orderedProduct.get('points') && <Checkbox
                        radio
                        disabled={isDisabledPointsOptions}
                        className='margin__bottom-positive--20'
                        name='points'
                        value='POINTS'
                        label={pointsLabel}
                        checked={modePayment === 'POINTS'}
                        onChange={_handleChange}
                      />
                    }
                    <StepWrapper className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={pointsModifierVisibility}>
                      <Label as='p' className='color__grey text__weight--500' size='large' >
                        <FormattedMessage {...messages.choosePointsTitle} />
                      </Label>
                      <Label as='p' className='margin__none text__weight--400' size='medium'>
                        <FormattedMessage {...messages.currentPoints} />
                        <Image src={PlainCliqqPlain} className='cliqq-plain-icon' alt='CLiQQ' />
                        { subtract(currentPoints, usePoints) }
                      </Label>
                      <RangeSlider
                        usePoints={usePoints}
                        maxPoints={this._computeTotalPointsPrice()}
                        pointsModifier={_updateUsePoints}
                        currentPoints={currentPoints}
                      />
                    </StepWrapper>
                  </Form.Field>
                </Form>
              </SelectMethodWrapper>
            </Grid.Row>
          </Grid>
        </CustomGrid>

        <ButtonContainer>
          <Button onClick={_handleProceed} primary fluid loading={orderRequesting} className='text__weight--700'>
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
  _handleRecentStore: PropTypes.func.isRequired,
  _stepWrapperRef: PropTypes.func.isRequired,
  _handleToBottom: PropTypes.func.isRequired,
  _handleChange: PropTypes.func.isRequired
}

export default OrderSummary
