/*
 *
 * PageOffline
 *
 */

import React from 'react'

import messages from './messages'

import OtherPage from 'components/OtherPage'
import offlineImage from 'images/offline.png'

export default function PageOffline () {
  const html = messages.header.defaultMessage

  return <OtherPage message={html} image={offlineImage} />
}
