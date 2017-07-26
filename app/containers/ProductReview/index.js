/*
 *
 * ProductReview
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import makeSelectProductReview from './selectors'
import messages from './messages'

import {
  Grid,
  Image,
  Form,
  Checkbox,
  Accordion } from 'semantic-ui-react'

import Button from 'components/Button'

import SampleProduct from 'images/test-images/samplebag.png'
import SampleBrand from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import NextIcon from 'images/icons/greater-than-icon.svg'

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
  LabelTitle,
  ReviewContainer,
  LocationButton,
  LabelSubTitle,
  LabelPrice
} from './styles'

export class ProductReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  handleToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 50)
  }

  render () {
    console.log(this.props.params)

    const labelOne = <label className='label-custom'>
      <LabelTitle>
        <FormattedMessage {...messages.cashPrepaid} />
      </LabelTitle>
      <LabelSubTitle>
        Get free 10points by paying through prepaid!
      </LabelSubTitle>
      <LabelPrice>
        <span className='total'>PHP 760</span>
        <span className='strike'>PHP 800</span>
      </LabelPrice>
    </label>

    const labelTwo = <label className='label-custom'>
      <LabelTitle>
        <FormattedMessage {...messages.cashDelivery} />
      </LabelTitle>
      <LabelPrice>
        <span className='total'>PHP 760</span>
        <span className='strike'>PHP 800</span>
      </LabelPrice>
    </label>

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
                  <ProductItem brand={SampleBrand}>
                    <Image src={SampleProduct} />
                  </ProductItem>
                  <CliqqCodeWrapper>
                    <Image src={CliqqLogo} /> 00001
                    </CliqqCodeWrapper>
                  <ProductName className='text-center'>ALL DAY BACKPACK | (WINE)</ProductName>
                </StepContent>
                <ViewDetails>
                  <Accordion fluid>
                    <Accordion.Title>
                      <FormattedMessage {...messages.viewDetails} />
                    </Accordion.Title>
                    <Accordion.Content>
                      <DetailsWrapper>
                        <FormattedMessage {...messages.productDetailsTitle} />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum earum consequuntur dolorem ullam, unde, incidunt debitis quam eos dolores ipsam nihil! Culpa aliquam quis temporibus asperiores esse magnam neque eaque.</p>
                        <FormattedMessage {...messages.productDeliveryTitle} />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum earum consequuntur dolorem ullam, unde, incidunt debitis quam eos dolores ipsam nihil! Culpa aliquam quis temporibus asperiores esse magnam neque eaque.</p>
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
                          name='checkboxRadioGroup'
                          value={false}
                          label={labelOne}
                          checked={this.state.value === false}
                          onChange={this.handleChange}
                          />

                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          radio
                          name='checkboxRadioGroup'
                          value
                          label={labelTwo}
                          checked={this.state.value === true}
                          onChange={this.handleChange}
                          onClick={this.handleToBottom}
                          />
                      </Form.Field>
                    </Form>
                  </SelectMethodWrapper>
                </StepContent>
              </StepWrapper>

              <StepWrapper className='visibility' visibility={this.state.value}>
                <StepContent>
                  <StepHead step='3' className='margin__top-positive--20'>
                    <FormattedMessage {...messages.stepThree} />
                    <p>Your default store will be the last store you visited</p>
                  </StepHead>
                  <LocationButton fluid icon={NextIcon}>
                    <span>FIND STORE NEARBY</span>
                  </LocationButton>
                </StepContent>
              </StepWrapper>

              <ButtonContainer>
                <Button primary fluid><FormattedMessage {...messages.proceedNext} /></Button>
              </ButtonContainer>
            </ReviewContainer>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

ProductReview.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  ProductReview: makeSelectProductReview()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview)
