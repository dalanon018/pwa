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
    background-color: red;
    border-radius: 50px;
    display: flex;
    height: 25px;
    justify-content: center;
    margin: 0 auto;
    width: 25px;

    &.remove:before {
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
  return (
    <div>
      <Modal size='small' open={open} onClose={close} >
        <Modal.Content>
          <IconWrapper>
            <Icon name='remove' className='custom-icon' />
          </IconWrapper>
          <TitleHead>{title}</TitleHead>
          <Content>{content}</Content>
        </Modal.Content>
      </Modal>
    </div>
  )
}

PromptModal.propTypes = {

}

export default PromptModal
