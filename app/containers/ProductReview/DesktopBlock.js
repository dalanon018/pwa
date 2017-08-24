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

import SampleProduct from 'images/test-images/samplebag.png'
import SampleBrand from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
// import NextIcon from 'images/icons/greater-than-icon.svg'

import {
  StepHead,
  ProductItem,
  CliqqCodeWrapper,
  ProductName,
  SelectMethodWrapper,
  DetailsWrapper,
  ButtonContainer
  // LocationButton
} from './styles'

function DesktopBlock ({
  orderedProduct,
  cliqqCode,
  labelOne,
  labelTwo,
  orderRequesting,
  modePayment,

  // function props
  // handleStoreLocator,
  handleChange,
  handleProceed,
  handleToBottom
}) {
  return (
    <Grid padded>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <ProductItem brand={SampleBrand}>
            <Image src={SampleProduct} />
          </ProductItem>
          <DetailsWrapper>
            <FormattedMessage {...messages.productDetailsTitle} />
            <div dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
            <FormattedMessage {...messages.productDeliveryTitle} />
            <div dangerouslySetInnerHTML={{__html: orderedProduct.get('shipping')}} />
            {/*
                <FormattedMessage {...messages.stepThree} />
                <p className='step-three'>Your default store will be the last store you visited</p>
                <LocationButton onClick={handleStoreLocator} fluid icon={NextIcon}>
                  <span>FIND STORE NEARBY</span>
                </LocationButton>
              */}
          </DetailsWrapper>
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <ButtonContainer>
          <Button onClick={handleProceed} primary loading={orderRequesting}>
            <FormattedMessage {...messages.proceedNext} />
          </Button>
        </ButtonContainer>
      </Grid.Row>
    </Grid>
  )
}

export default DesktopBlock
