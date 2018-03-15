/**
*
* Registration
*
*/

import React from 'react'
// import styled from 'styled-components'
import Recaptcha from 'react-google-recaptcha'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import { Image, Label, Button, Grid } from 'semantic-ui-react'

// import { Container } from 'semantic-ui-react'

import BannerBg from 'images/modal-bg-lightgrey.png'
import MobileIcon from 'images/icons/mobile-icon.svg'
import BackIcon from 'images/icons/back.svg'

import CloseButton from 'components/Shared/CloseButton'
import Input from 'components/Shared/InputField'
import Checkbox from 'components/Shared/CheckboxField'
import Modal from 'components/Shared/PromptModal'
import A from 'components/Shared/A'
import PopupVerification from 'components/Mobile/PopupVerification'

import { LoadingStateInfo } from 'components/Shared/LoadingBlock'
import { RECAPTCHA_SITE_KEY } from 'containers/App/constants'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TextWrapper,
  PopupContent,
  TermsConditionsWrapper,
  ButtonWrapper,
  TermsConditionsHeader,
  Wrapper
} from './styles'

// const RegistrationWrapper = styled.div`
//   background-color: #F7F7F7;
//   height: 100vh;
//   left: 0;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 9;
// `

// const ContentWrapper = styled.div`
//   align-items: center;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   left: 50%;
//   position: absolute;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   width: 100%;
//   padding: 0 150px;
// `

// const BoxWrapper = styled.div`
//   background-color: #FFFFFF;
//   border: 2px solid #EBEBEB;
//   padding: 30px;
//   width: 100%;
// `

function Registration ({
  loadingMarkdown,
  submissionLoader,
  history,
  value,
  // check,
  markdown,
  toggleTerms,
  verificationToggle,
  disabledButton,
  errModalToggle,
  errModalName,
  errorTitle,
  errorMessage,

  _handleInput,
  _toggleTerms,
  _handlePaste,
  _handleCheck,
  _handleSubmit,
  _handleErrModalClose,
  _handleSubmitVerification,
  _closePopupSlide,
  _executeResendCode,
  _recaptchaRef,
  _executeCaptcha,
  _agreeAction
}) {
  return (
    // <RegistrationWrapper>
    //   <Container className='position__relative'>
    //     <ContentWrapper>
    //       <BoxWrapper>
    //         <FormattedMessage {...messages.header} />
    //       </BoxWrapper>
    //     </ContentWrapper>
    //   </Container>
    // </RegistrationWrapper>

    <Wrapper className='background__white'>
      <PopupWrapper>
        <BannerHeader background={BannerBg}>
          <span className='background__teal'>
            <Image alt='CLiQQ' src={MobileIcon} />
          </span>
        </BannerHeader>
        <PopupContainer className='background__white'>
          <PopupContent>
            <TextWrapper>
              <Label as='p' basic size='huge' className='text__weight--500'>
                <FormattedMessage {...messages.register} />
              </Label>
              <Label as='p' basic size='large' className='text__weight--400'><FormattedMessage {...messages.label} /></Label>
            </TextWrapper>

            <InputWrapper>
              <Label as='span' basic className='color__grey text__weight--700' size='massive'>
                <FormattedMessage {...messages.phonePrefix} />
              </Label>

              <Input
                type='tel'
                value={value}
                onChange={_handleInput}
                placeholder='9XXXXXXXXX'
                onPaste={_handlePaste} />
            </InputWrapper>
            <Checkbox
              className='margin__bottom-positive--20 display__none'
              onChange={_handleCheck}
              checked
              name='checkbox'
              label={(
                <Label as='span' basic className='color__grey text__weight--400 text__align--center' size='medium'>
                  <FormattedMessage {...messages.checkTermsLabel} />
                  <A key={0} className='color__primary text__weight--500' onClick={_toggleTerms}>
                    <FormattedMessage {...messages.checkTermsLink} />
                  </A>
                </Label>
              )}
            />
            <Button
              disabled={disabledButton}
              loading={submissionLoader}
              primary
              fluid
              onClick={_handleSubmit}>
              <FormattedMessage {...messages.submitButton} />
            </Button>

            <CloseButton close={history.goBack} text='Cancel' />
          </PopupContent>
        </PopupContainer>
        <Modal
          open={errModalToggle}
          name={errModalName}
          title={errorTitle}
          content={errorMessage}
          close={_handleErrModalClose}
        />

        <PopupVerification
          submit={_handleSubmitVerification}
          toggle={verificationToggle}
          onClose={_closePopupSlide}
          submissionLoader={submissionLoader}
          resendCode={_executeResendCode}
        />

        <Recaptcha
          ref={_recaptchaRef}
          size='invisible'
          badge='inline'
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={_executeCaptcha}
        />
      </PopupWrapper>
      <TermsConditionsWrapper toggle={toggleTerms} className='background__white'>
        <div className='document-helper terms-conditions'>
          <Grid padded>
            <TermsConditionsHeader toggle={toggleTerms} className='background__white'>
              <Grid padded>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <div className='back-icon-container'>
                      <Image alt='CLiQQ' src={BackIcon} onClick={_toggleTerms} />
                    </div>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Label as='span' size='large' className='tc-header-label'>
                      <FormattedMessage {...messages.headerTerms} />
                    </Label>
                  </Grid.Column>
                  <Grid.Column width={3} />
                </Grid.Row>
              </Grid>
            </TermsConditionsHeader>
            <LoadingStateInfo loading={loadingMarkdown} count='4'>
              <div className='animation-fade tc-content color__grey' dangerouslySetInnerHTML={{__html: markdown}} />
            </LoadingStateInfo>
            <ButtonWrapper toggle={toggleTerms}>
              <Button primary fluid onClick={_agreeAction}><FormattedMessage {...messages.buttonLabelAgree} /></Button>
            </ButtonWrapper>
          </Grid>
        </div>
      </TermsConditionsWrapper>
    </Wrapper>
  )
}

Registration.propTypes = {

}

export default Registration
