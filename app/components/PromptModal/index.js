/**
*
* PromptModal
*
*/

import React from 'react'
import styled from 'styled-components'
import { Modal, Icon } from 'semantic-ui-react'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

const IconWrapper = styled.div`
  text-align: center;

  .custom-icon {
    align-items: center;
    background-color: ${props => props.background};
    border-radius: 50px;
    display: flex;
    height: 25px;
    justify-content: center;
    margin: 0 auto;
    width: 25px;

    &.icon:before {
      color: #FFFFFF;
    }
  }
`

const TitleHead = styled.p`
  text-align: center;
  font-family: 'helveticabold';
  color: #5B5B5B;
  margin: 10px 0;
`

const Content = styled.p`
  text-align: center;
  font-size: 12px;
`

function PromptModal ({
  title,
  name,
  content,
  open,
  close
}) {
  let color = ''
  const handleColor = () => {
    switch (name) {
      case 'checkmark':
        color = '#9BCB49'
        break
      case 'remove':
        color = '#EB1C24'
        break
      case 'warning':
        color = '#F58322'
        break
    }
  }
  handleColor()
  return (
    <Modal size='small' open={open} onClose={close}>
      <Modal.Content>
        <IconWrapper background={color}>
          <Icon name={name} className='custom-icon' />
        </IconWrapper>
        <TitleHead>{title}</TitleHead>
        <Content>{content}</Content>
      </Modal.Content>
    </Modal>
  )
}

PromptModal.propTypes = {

}

export default PromptModal
