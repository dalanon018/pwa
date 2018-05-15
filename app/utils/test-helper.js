/*
 * Wraps an internationalized React component within an <IntlProvider />
 * context with any BCP 47 language tag
 */

import { IntlProvider } from 'react-intl'
import React from 'react'

function intl ({
  component,
  locale,
  messages
}) {
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      {React.cloneElement(component)}
    </IntlProvider>
  )
}

export {
  intl
}
