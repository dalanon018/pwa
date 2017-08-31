/**
*
* Product
*
*/

import React, { PropTypes } from 'react'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import CliqqLogo from 'images/icons/cliqq.png'

import MobileBlock from './MobileBlock'
import DesktopBlock from './DesktopBlock'

const Product = ({
  product,
  loading,
  popup,
  toggle,
  toggleClick,
  defaultImage,
  copied,
  productSlider,
  productPageTrigger,
  windowWidth,

  // For Phone Prompt Desktop Modal
  submit,
  modalToggle,
  toggleModal,
  openModal,
  modalStatus,
  closeModal,
  mobileNumber,
  onClose }) => {
  const cliqqCode = product.get('cliqqCode') && product.get('cliqqCode').first()
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const {
    FacebookShareButton,
    TwitterShareButton
  } = ShareButtons

  return (
    <div>
      {/*
        <ImageBanner className='mobile-visibility'>
          <LoadingStateImage loading={loading}>
            <Image src={Test0001} />
          </LoadingStateImage>
        </ImageBanner>
      */}

      <DesktopBlock
        FacebookIcon={FacebookIcon}
        FacebookShareButton={FacebookShareButton}
        TwitterIcon={TwitterIcon}
        TwitterShareButton={TwitterShareButton}
        cliqqCode={cliqqCode}
        cliqqLogo={CliqqLogo}
        closeModal={closeModal}
        defaultImage={defaultImage}
        loading={loading}
        mobileNumber={mobileNumber}
        modalStatus={modalStatus}
        modalToggle={modalToggle}
        onClose={onClose}
        openModal={openModal}
        product={product}
        submit={submit}
        toggleModal={toggleModal}
        windowWidth={windowWidth} />
      <MobileBlock
        FacebookIcon={FacebookIcon}
        FacebookShareButton={FacebookShareButton}
        TwitterIcon={TwitterIcon}
        TwitterShareButton={TwitterShareButton}
        cliqqCode={cliqqCode}
        cliqqLogo={CliqqLogo}
        copied={copied}
        loading={loading}
        popup={popup}
        product={product}
        toggle={toggle}
        toggleClick={toggleClick}
        windowWidth={windowWidth} />

    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Product
