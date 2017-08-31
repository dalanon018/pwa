import React from 'react'

import {
  Grid,
  Image,
  Form,
  Checkbox
} from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Button from 'components/Button'
import ProductSlider from 'components/BannerSlider'

import CliqqLogo from 'images/icons/cliqq.png'
// import NextIcon from 'images/icons/greater-than-icon.svg'

import {
  ButtonContainer,
  CliqqCodeWrapper,
  DetailsWrapper,
  ProductName,
  SelectMethodWrapper,
  StepHead
  // LocationButton
} from './styles'

function DesktopBlock ({
  orderedProduct,
  cliqqCode,
  labelOne,
  labelTwo,
  orderRequesting,
  windowWidth,
  modePayment,
  productLoader,
  defaultImage,

  // function props
  // handleStoreLocator,
  handleChange,
  handleProceed,
  handleToBottom
}) {
  const productImages = [orderedProduct]

  return (
    <Grid padded>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <ProductSlider
            images={productImages}
            windowWidth={windowWidth}
            loader={productLoader} />
        </Grid.Column>
        <Grid.Column>
          <StepHead step='1'>
            <FormattedMessage {...messages.stepOne} />
          </StepHead>
          <ProductName className='text-center'>{orderedProduct.get('title')}</ProductName>
          <CliqqCodeWrapper>
            <Image src={CliqqLogo} /> { cliqqCode }
          </CliqqCodeWrapper>

          <StepHead step='2' className='margin__top-positive--20'>
            <FormattedMessage {...messages.stepTwo} />
          </StepHead>
          <SelectMethodWrapper>
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  name='cash-prepaid'
                  value='CASH'
                  label={labelOne}
                    // checked={modePayment === 'CASH'}
                  defaultChecked
                  onChange={handleChange}
                    />
              </Form.Field>
              <Form.Field className='display__none'> {/* Cash on Deliver option */}
                <Checkbox
                  radio
                  name='cod'
                  value='COD'
                  label={labelTwo}
                  checked={modePayment === 'COD'}
                  onChange={handleChange}
                  onClick={handleToBottom}
                    />
              </Form.Field>
            </Form>
          </SelectMethodWrapper>

          <DetailsWrapper>
            <FormattedMessage {...messages.productDetailsTitle} />
            <div dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
            <div className='mobile-visibility'>
              <FormattedMessage {...messages.productDeliveryTitle} />
              <div dangerouslySetInnerHTML={{__html: orderedProduct.get('shipping')}} />
            </div>
            {/*
                <FormattedMessage {...messages.stepThree} />
                <p className='step-three'>Your default store will be the last store you visited</p>
                <LocationButton onClick={handleStoreLocator} fluid icon={NextIcon}>
                  <span>FIND STORE NEARBY</span>
                </LocationButton>
              */}
          </DetailsWrapper>

          <ButtonContainer>
            <Button onClick={handleProceed} primary loading={orderRequesting} desktopLayout>
              <FormattedMessage {...messages.proceedNext} />
            </Button>
          </ButtonContainer>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default DesktopBlock
