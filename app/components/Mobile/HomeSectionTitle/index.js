/**
*
* HomeSectionTitle
*
*/

import React from 'react'
import styled from 'styled-components'
// import H3 from 'components/Shared/H3'
import { Label, Image } from 'semantic-ui-react'
import ArrowIcon from 'images/icons/goto-icon.svg'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  .title {
    color: #7D868C !important;
  }
  .link {
    color: #FF4814 !important;
  }
`

const LinkWrapper = styled.div`
  text-transform: uppercase;

  img {
    display: inline-block;
    float: right;
    margin-left: 5px;
    margin-top: 3px;
    vertical-align: middle;
    width: 6px;
  }
`

function HomeSectionTitle () {
  return (
    <Wrapper>
      <Label basic size='big' className='title'>
        Featured Brands
      </Label>
      <Label basic size='medium' className='link'>
        <LinkWrapper>
          <span>More Brands</span>
          <Image src={ArrowIcon} alt='CLiQQ' />
        </LinkWrapper>
      </Label>
    </Wrapper>
  )
}

HomeSectionTitle.propTypes = {

}

export default HomeSectionTitle
