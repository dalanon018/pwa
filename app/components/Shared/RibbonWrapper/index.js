/**
*
* RibbonWrapper
*
*/

import React from 'react'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  right: ${props => props.rightSpace ? props.rightSpace + 'px' : 0};

  .ribbon-tag {
    align-items: middle;
    border-radius: 3px 0 0 3px;
    display: flex;
    flex-wrap: wrap;
    font-size: 11px;
    font-weight: 700;
    height: 38px;
    justify-content: center;
    line-height: 14px;
    padding: 4px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 40px;

    span {
      line-height: 8px;
      margin-top: -5px;
    }
  }
`

function RibbonWrapper ({ rightSpace }) {
  return (
    <Wrapper rightSpace={rightSpace}>
      <div className='ribbon-tag background__gold'>
        <Label as='b' className='color__white padding__none text__weight--500' basic size='small'>20%</Label>
        <Label as='span' className='color__white padding__none text__weight--500' basic size='mini'>
          <FormattedMessage {...messages.off} />
        </Label>
      </div>
    </Wrapper>
  )
}

RibbonWrapper.propTypes = {

}

export default RibbonWrapper
