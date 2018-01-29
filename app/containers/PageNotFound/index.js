/*
 *
 * PageNotFound
 *
 */

import React from 'react'

import messages from './messages'

import OtherPage from 'components/Shared/OtherPage'
import notFoundImage from 'images/not-found.png'

export default function PageNotFound () {
  const html = messages.header.defaultMessage

  return <OtherPage message={html} image={notFoundImage} />
}
