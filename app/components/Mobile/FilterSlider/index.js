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
  complement,
  ifElse,
  isEmpty,
  prop,
  both,
  equals
} from 'ramda'

import LoadingIndicator from 'components/Shared/LoadingIndicator'

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
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  flex: 1;
  align-items: flex-end;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 14px;
  right: ${props => props.toggleDrawer ? 0 : '-100%'};
  transition: ease 0.3s;
  width: 100%;
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
    toggleCategory: PropTypes.string.isRequired,
    toggleBrands: PropTypes.array.isRequired,
    selectedCategory: PropTypes.object.isRequired,
    selectedBrands: PropTypes.array.isRequired,
    categoriesLoading: PropTypes.bool.isRequired,
    brandsLoading: PropTypes.bool
  }

  state = {
    disabledReset: true
  }

  _handleRadioGroup = () => {
    const { handleToggleCategory } = this.context
    const { toggleCategory, categoriesLoading } = this.props

    return (
      <BlockWrapper>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Label basic as='p' size='large' className='color__grey text__weight--500'>
                <FormattedMessage {...messages.categories} />
              </Label>

              <FormWrapper>
                { categoriesLoading && <LoadingIndicator /> }
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
    const { toggleBrands, brandsLoading } = this.props
    return (
      <BlockWrapper>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Label basic as='p' size='large' className='color__grey text__weight--500'>
                <FormattedMessage {...messages.brands} />
              </Label>

              <FormWrapper>
                { brandsLoading && <LoadingIndicator /> }
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
    complement(isEmpty),
    prop(key)
  )

  componentWillReceiveProps (nextProps) {
    const shouldDisableReset = ifElse(
      anyPass([
        both(
          this._notEmpty('selectedCategory'),
          compose(
            complement(equals(nextProps.queryCategory)),
            prop('toggleCategory')
          )),
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
