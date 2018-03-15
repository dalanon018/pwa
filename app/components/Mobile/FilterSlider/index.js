/**
*
* FilterSlider
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Grid, Label, Button, Radio, Form, Checkbox } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {
  anyPass,
  compose,
  ifElse,
  lt,
  path
} from 'ramda'

import messages from './messages'

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  right: ${props => props.toggleDrawer ? 0 : '-100%'};
  // right: 0;
  width: 75%;
  z-index: 999;
  transition: ease 0.3s;
`

const OptionWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 66px;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
    visibility: hidden;
  }
`

const ButtonWrapper = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 14px;
  position: fixed;
  right: ${props => props.toggleDrawer ? 0 : '-100%'};
  transition: ease 0.3s;
  width: 75%;
  z-index: 999;
`

const FormWrapper = styled(Form)`
  display: flex;
  flex-wrap: wrap;

  button {
    margin: 2px !important;
  }
`

const BlockWrapper = styled.div`
  border-bottom: 1px solid #F4F4F4;
  padding: 10px 0;
`

class FilterSlider extends React.PureComponent {
  static contextTypes = {
    handleToggleCategory: PropTypes.func.isRequired,
    handleToggleBrands: PropTypes.func.isRequired,
    toggleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  static propTypes = {
    toggleDrawer: PropTypes.bool.isRequired,
    toggleCategory: PropTypes.string,
    toggleBrands: PropTypes.array,
    selectedCategory: PropTypes.string,
    selectedBrands: PropTypes.array
  }

  state = {
    disabledReset: true
  }

  _handleRadioGroup = () => {
    const { handleToggleCategory } = this.context
    const { toggleCategory } = this.props

    return (
      <BlockWrapper>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Label basic as='p' size='large' className='color__grey text__weight--500'>
                <FormattedMessage {...messages.categories} />
              </Label>

              <FormWrapper>
                {
                  this.props.categories.map((item, index) => {
                    const value = item.get('id')
                    const trigger = toggleCategory === value

                    return (
                      <Form.Field key={index}>
                        <Button className={`${trigger && 'active-radio-checkbox'} background__fade-grey`} onClick={() => handleToggleCategory(value)}>
                          {item.get('name')}
                        </Button>
                        <Radio
                          label={item.get('name')}
                          checked={trigger}
                          className='display__none'
                          value={value}
                          name='radio'
                        />
                      </Form.Field>
                    )
                  })
                }
              </FormWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BlockWrapper>
    )
  }

  _handleCheckboxGroup = () => {
    const { handleToggleBrands } = this.context
    const { toggleBrands } = this.props
    return (
      <BlockWrapper>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Label basic as='p' size='large' className='color__grey text__weight--500'>
                <FormattedMessage {...messages.brands} />
              </Label>

              <FormWrapper>
                {
                  this.props.brands.map((item, index) => {
                    const value = item.get('id')
                    const trigger = toggleBrands.indexOf(value) > -1

                    return (
                      <Form.Field key={index}>
                        <Button className={`${trigger && 'active-radio-checkbox'} background__fade-grey`} onClick={() => handleToggleBrands(value)}>
                          {item.get('name')}
                        </Button>
                        <Checkbox
                          label={item.get('name')}
                          checked={trigger}
                          className='display__none'
                          value={value}
                          name='checkbox'
                        />
                      </Form.Field>
                    )
                  })
                }
              </FormWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BlockWrapper>
    )
  }

  _handleDisabledReset = (disabledReset) => () => {
    this.setState(() => ({
      disabledReset: disabledReset
    }))
  }

  _notEmpty = (key) => compose(
    lt(0),
    path([key, 'length'])
  )

  componentWillReceiveProps (nextProps) {
    const shouldDisableReset = ifElse(
      anyPass([
        this._notEmpty('selectedCategory'),
        this._notEmpty('selectedBrands')
      ]),
      this._handleDisabledReset(false),
      this._handleDisabledReset(true)
    )

    shouldDisableReset(nextProps)
  }

  render () {
    const { categories, brands, toggleDrawer } = this.props
    const { toggleReset, handleSubmit } = this.context
    const { disabledReset } = this.state
    return (
      <Wrapper className='background__white' toggleDrawer={toggleDrawer}>
        <OptionWrapper>
          { categories && this._handleRadioGroup() }
          { brands && this._handleCheckboxGroup() }
        </OptionWrapper>
        <ButtonWrapper toggleDrawer={toggleDrawer}>
          <Button basic onClick={toggleReset} disabled={disabledReset}>
            <FormattedMessage {...messages.reset} />
          </Button>
          <Button primary onClick={handleSubmit}>
            <FormattedMessage {...messages.done} />
          </Button>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

export default FilterSlider
