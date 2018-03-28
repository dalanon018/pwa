/**
*
* RecentStore
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Checkbox, Label } from 'semantic-ui-react'

const LabelWrapper = styled.div`
  width: 100%;

  .checkbox {
    border-radius: 5px;
    height: 100%;
    padding: 18px 15px;
    position: relative;
    width: 100%;

    input:checked~label:after {
      content: '';
      width: 12px;
      height: 7px;
      position: absolute;
      top: 30%;
      right: 6px;
      left: inherit !important;
      border: 3px solid #fcfff4;
      border-top: none;
      border-right: none;
      background: transparent !important;
      transform: rotate(-45deg);
    }

    input:checked~label:before {
      background-color: #229D90 !important;
      border-color: #229D90 !important;
      height: 24px;
      position: absolute;
      width: 24px;
    }

    .label-custom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding-left: 0 !important;
      padding-right: 35px !important;
      position: relative;
    }
  }

  // Custom style alignment for checkbox semantic
  .ui.radio.checkbox .box:before, .ui.radio.checkbox label:before {
    left: inherit !important;
    right: 0 !important;
    top: 50%;
    transform: translateY(-50%);
  }
`

function RecentStore ({ windowWidth, handleToggle, toggle, value }) {
  const label = () => {
    const storeName = (data = '') => {
      let maxChar = 18

      switch (true) {
        case (windowWidth >= 375 && windowWidth <= 500):
          maxChar = 25
          break
        case (windowWidth >= 767):
          maxChar = 50
          break
      }

      if (data && data.length > maxChar) {
        return `${data.slice(0, maxChar)}...`
      }
      return data
    }

    return (
      <label className='label-custom'>
        <Label as='p' basic size='large' className='text__weight--500 margin__none'>
          { storeName(value.get('name')) }
        </Label>
      </label>
    )
  }

  return (
    <LabelWrapper className='border_bottom__two--light-grey'>
      <Checkbox
        radio
        // isBlackListed={isBlackListed}
        name='store'
        value={value.get('id')}
        label={label()}
        checked={toggle === value.get('id')}
        onChange={handleToggle}
      />
    </LabelWrapper>
  )
}

RecentStore.propTypes = {
  value: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
}

export default RecentStore
