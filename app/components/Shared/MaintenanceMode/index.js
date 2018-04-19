/**
*
* MaintenanceMode
*
*/

import React from 'react'
import styled from 'styled-components'
import { Image, Label } from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Background from 'images/maintenance/wall-bg.jpg'
import Logo from 'images/maintenance/logo.png'

const Wrapper = styled.div`
  background: url(${props => props.background}) no-repeat center center / cover;
  height: 100vh;
  position: fixed;
  width: 100%;
  z-index: 999;
`

const Container = styled.div`
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0 0 10px #999999;
  display: flex;
  justify-content: center;
  left: 50%;
  padding: 100px 15px;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  img {
    margin: 20px auto;
  }
`

function MaintenanceMode () {
  return (
    <Wrapper background={Background}>
      <Container>
        <div>
          <Image src={Logo} />
          <Label className='text_weight--700 main color__grey' as='p' basic size='massive'>
            <FormattedMessage {...messages.header} />
          </Label>
          <Label className='text_weight--400 sub' as='p' basic size='large'>
            <FormattedMessage {...messages.description} />
          </Label>
        </div>
      </Container>
    </Wrapper>
  )
}

export default MaintenanceMode
