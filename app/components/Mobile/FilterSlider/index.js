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
  height: 92vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
    visibility: hidden;
  }
`

const ButtonWrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 14px;
  position: absolute;
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
    toggleDrawer: PropTypes.bool.isRequired,
    toggleRadio: PropTypes.string,
    handleToggleRadio: PropTypes.func.isRequired,
    toggleCheckbox: PropTypes.array,
    handleToggleCheckbox: PropTypes.func.isRequired,
    filterCategories: PropTypes.object.isRequired,
    filterBrands: PropTypes.object.isRequired,
    toggleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  _handleRadioGroup = () => {
    const { toggleRadio, handleToggleRadio, filterCategories } = this.context

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
                  filterCategories.map((item, index) => {
                    const value = item.get('id')
                    const trigger = toggleRadio === value

                    return (
                      <Form.Field key={index}>
                        <Button className={`${trigger && 'active-radio-checkbox'} background__fade-grey`} onClick={() => handleToggleRadio(value)}>
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
    const { toggleCheckbox, handleToggleCheckbox, filterBrands } = this.context

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
                  filterBrands.map((item, index) => {
                    const value = item.get('id')
                    const trigger = toggleCheckbox.indexOf(value) > -1

                    return (
                      <Form.Field key={index}>
                        <Button className={`${trigger && 'active-radio-checkbox'} background__fade-grey`} onClick={() => handleToggleCheckbox(value)}>
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

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (this.context !== nextContext) {
      return true
    }
  }

  render () {
    const { toggleDrawer, toggleReset, handleSubmit } = this.context
    return (
      <Wrapper className='background__white' toggleDrawer={toggleDrawer}>
        <OptionWrapper>
          { this._handleRadioGroup() }
          { this._handleCheckboxGroup() }
        </OptionWrapper>
        <ButtonWrapper>
          <Button basic onClick={toggleReset}>
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
