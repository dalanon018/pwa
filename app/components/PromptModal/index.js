/**
*
* PromptModal
*
*/

import React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import { Modal, Icon } from 'semantic-ui-react'

import Button from 'components/Button'

import messages from './messages'

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

const TitleHead = styled.div`
  text-align: center;
  font-family: 'helveticabold';
  color: #5B5B5B;
  margin: 10px 0;
`

const Content = styled.div`
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
        color = '#8DC640'
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
        <Content>
          {content}
          <Button primary fluid onClick={close}>
            <FormattedMessage {...messages.promptOk} />
          </Button>
        </Content>
      </Modal.Content>
    </Modal>
  )
}

PromptModal.propTypes = {

}

export default PromptModal
