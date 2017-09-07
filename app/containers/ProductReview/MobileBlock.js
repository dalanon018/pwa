
import React from 'react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import {
  Grid,
  Image,
  Form,
  Checkbox,
  Accordion
} from 'semantic-ui-react'

import Button from 'components/Button'

import CliqqLogo from 'images/icons/cliqq.png'
// import NextIcon from 'images/icons/greater-than-icon.svg'

import {
  StepHead,
  ProductItem,
  StepContent,
  CliqqCodeWrapper,
  ProductName,
  SelectMethodWrapper,
  DetailsWrapper,
  ViewDetails,
  ButtonContainer,
  StepWrapper,
  ReviewContainer
  // LocationButton
} from './styles'

function MobileBlock ({
  orderedProduct,
  cliqqCode,
  labelOne,
  labelTwo,
  orderRequesting,
  modePayment,
  defaultImage,

  // function props
  // handleStoreLocator,
  handleChange,
  handleProceed,
  handleToBottom
}) {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column className='padding__none--horizontal'>

          <ReviewContainer>
            <StepWrapper>
              <StepContent>
                <StepHead step='1'>
                  <FormattedMessage {...messages.stepOne} />
                </StepHead>
                <ProductItem brand={orderedProduct.get('brandLogo')}>
                  <Image alt='Cliqq' src={orderedProduct.get('image') ? orderedProduct.get('image') : defaultImage} />
                </ProductItem>
                <CliqqCodeWrapper>
                  <Image alt='Cliqq' src={CliqqLogo} /> { cliqqCode }
                </CliqqCodeWrapper>
                <ProductName className='text-center'>{orderedProduct.get('title')}</ProductName>
              </StepContent>
              <ViewDetails>
                <Accordion fluid>
                  <Accordion.Title>
                    <FormattedMessage {...messages.viewDetails} />
                  </Accordion.Title>
                  <Accordion.Content>
                    <DetailsWrapper>
                      <FormattedMessage {...messages.productDetailsTitle} />
                      <div dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
                      <FormattedMessage {...messages.productDeliveryTitle} />
                      <div dangerouslySetInnerHTML={{__html: orderedProduct.get('shipping')}} />
                    </DetailsWrapper>
                  </Accordion.Content>
                </Accordion>
              </ViewDetails>
            </StepWrapper>

            <StepWrapper>
              <StepContent>
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
              </StepContent>
            </StepWrapper>

            {/* <StepWrapper className='visibility' visibility={visibility}> */}
            {/*
              <StepWrapper>
                <StepContent>
                  <StepHead step='3' className='margin__top-positive--20'>
                    <FormattedMessage {...messages.stepThree} />
                    <p>Your default store will be the last store you visited</p>
                  </StepHead>
                  <LocationButton onClick={this._handleStoreLocator} fluid icon={NextIcon}>
                    <span>FIND STORE NEARBY</span>
                  </LocationButton>
                </StepContent>
              </StepWrapper>
            */}
            <ButtonContainer>
              <Button onClick={handleProceed} primary fluid loading={orderRequesting}><FormattedMessage {...messages.proceedNext} /></Button>
            </ButtonContainer>
          </ReviewContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default MobileBlock
