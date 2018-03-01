/**
*
* PromptModal
*
*/

import React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import { Modal, Icon, Button, Label } from 'semantic-ui-react'

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
  margin: 10px 0;
`

const Content = styled.div`
  text-align: center;
  font-size: 12px;
`

const ModalWrapper = styled.div`
  padding: 10px 50px !important;

  @media (min-width: 1024px) {
    background-color: #FFFFFF;
    padding: 30px 50px !important;
  }
`

const CustomLabel = styled(Label)`
  padding-bottom: 20px;

  &.plain-button {
    cursor: pointer;
    margin-top : 15px;
  }
`

const ModalContentCustom = styled(Modal.Content)`
  @media (min-width: 1024px) {
    background: transparent !important;
    padding: 21px 100px !important;
  }
`

const CustomModal = styled(Modal)`
  @media (min-width: 1024px) {
    background: transparent !important;
    box-shadow: none !important;
  }
`

const PrimaryButtonWrapper = styled.div`
  @media (min-width: 1024px) {
    margin-top: 10px;
    padding: 0 110px;
  }
`

function PromptModal ({
  title,
  name,
  content,
  open,
  close,
  // category page custom props
  isCategory,
  letIn
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
    <div>
      {
        isCategory
        ? <CustomModal size='small' open={open}>
          <ModalContentCustom>
            <ModalWrapper>
              <IconWrapper background={color}>
                <Icon name={name} className='custom-icon' />
              </IconWrapper>
              <TitleHead>
                <Label as='span' basic size='large'>
                  WARNING
                </Label>
              </TitleHead>
              <Content>
                <CustomLabel className='text__roboto--light' as='p' basic size='medium'>
                  <FormattedMessage {...messages.rated18} />
                </CustomLabel>
                <CustomLabel className='text__roboto--light' as='p' basic size='medium'>
                  <FormattedMessage {...messages.confirm18} />
                </CustomLabel>
                <Button primary fluid onClick={letIn}>
                  <FormattedMessage {...messages.im18} />
                </Button>
                <CustomLabel className='text__roboto--light plain-button' as='p' basic size='medium' onClick={close}>
                  <FormattedMessage {...messages.not18} />
                </CustomLabel>
              </Content>
            </ModalWrapper>
          </ModalContentCustom>
        </CustomModal>
        : <CustomModal size='small' open={open} onClose={close}>
          <ModalContentCustom>
            <ModalWrapper>
              <IconWrapper background={color}>
                <Icon name={name} className='custom-icon' />
              </IconWrapper>
              <TitleHead>
                <Label as='span' basic size='large'>
                  {title}
                </Label>
              </TitleHead>
              <Content>
                <CustomLabel className='text__roboto--light' as='p' basic size='medium'>
                  {content}
                </CustomLabel>
                <PrimaryButtonWrapper>
                  <Button primary fluid onClick={close}>
                    <FormattedMessage {...messages.promptOk} />
                  </Button>
                </PrimaryButtonWrapper>
              </Content>
            </ModalWrapper>
          </ModalContentCustom>
        </CustomModal>
      }

    </div>
  )
}

PromptModal.propTypes = {

}

export default PromptModal
