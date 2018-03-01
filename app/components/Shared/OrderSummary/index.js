/**
*
* OrderSummary
*
*/

import React from 'react'
import { isEmpty } from 'lodash'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

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
  CustomGrid
} from './styles'

class OrderSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const {
      brandLogo,
      orderedProduct,
      orderRequesting,
      isBlackListed,
      productLoader,
      labelOne,
      ShowCodComponent,
      labelTwo,
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
      _handleChange,
      _updateParamsImages } = this.props

    return (
      <ProductReviewWrapper>
        { productLoader || brandLogo }
        <LoadingStateImage loading={productLoader} center>
          <ProductItem>
            <Image alt='CLiQQ' src={_updateParamsImages(orderedProduct.get('image'))} />
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
                </Form>
              </SelectMethodWrapper>
            </Grid.Row>
          </Grid>
        </CustomGrid>
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

}

export default OrderSummary
