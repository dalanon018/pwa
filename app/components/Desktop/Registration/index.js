/**
*
* Registration
*
*/

import React from 'react'
import Recaptcha from 'react-google-recaptcha'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import { Container, Image, Label, Button, Grid } from 'semantic-ui-react'

// import { Container } from 'semantic-ui-react'

import BackIcon from 'images/icons/back.svg'

import CloseButton from 'components/Shared/CloseButton'
import Input from 'components/Shared/InputField'
import Checkbox from 'components/Shared/CheckboxField'
import Modal from 'components/Shared/PromptModal'
import A from 'components/Shared/A'
import PopupVerification from 'components/Desktop/PopupVerification'

import MainLogo from 'images/cliqq-logo.svg'

import { LoadingStateInfo } from 'components/Shared/LoadingBlock'
import { RECAPTCHA_SITE_KEY } from 'containers/App/constants'

import {
  PopupContainer,
  InputWrapper,
  TextWrapper,
  TermsConditionsWrapper,
  ButtonWrapper,
  TermsConditionsHeader,
  CaptchaWrapper,
  RegistrationWrapper,
  ContentWrapper,
  BoxWrapper,
  ImageLogo
} from './styles'

function Registration ({
  loadingMarkdown,
  submissionLoader,
  history,
  value,
  check,
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
    <div>
      <RegistrationWrapper>
        <Container className='position__relative'>
          <PopupContainer>
            <ContentWrapper>
              <ImageLogo alt='logo' src={MainLogo} />
              <BoxWrapper>
                <TextWrapper>
                  <Label as='p' basic size='massive' className='text__weight--500'>
                    <FormattedMessage {...messages.register} />
                  </Label>
                  <Label as='p' basic className='color__grey text__weight--400' size='big'>
                    <FormattedMessage {...messages.label} />
                  </Label>
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
                  className='margin__bottom-positive--20'
                  onChange={_handleCheck}
                  checked={check}
                  name='checkbox'
                  label={(
                    <Label as='span' basic className='checkbox-label margin__left-positive--10 color__grey text__weight--500' size='large'>
                      <FormattedMessage {...messages.checkTermsLabel} />
                      <A className='color__primary' key={0} onClick={_toggleTerms}>
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
              </BoxWrapper>

              <CloseButton close={history.goBack} text='Close' />

              <CaptchaWrapper>
                <div className='captcha-container'>
                  <Recaptcha
                    ref={_recaptchaRef}
                    size='invisible'
                    badge='inline'
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={_executeCaptcha}
                  />
                </div>
              </CaptchaWrapper>
            </ContentWrapper>
          </PopupContainer>
        </Container>

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
      </RegistrationWrapper>
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
            <ButtonWrapper className='background__white box__shadow--primary' toggle={toggleTerms}>
              <Button primary onClick={_agreeAction}><FormattedMessage {...messages.buttonLabelAgree} /></Button>
            </ButtonWrapper>
          </Grid>
        </div>
      </TermsConditionsWrapper>
    </div>
  )
}

Registration.propTypes = {

}

export default Registration
