/**
*
* OtherPage
*
*/

import React from 'react'

import { Image } from 'semantic-ui-react'
import H1 from 'components/H1'

import { Wrapper } from './styles'

function OtherPage ({ message, image }) {
  return (
    <div>
      <Wrapper>
        <div>
          <Image alt='CLiQQ' src={image} />
          <H1>
            <div dangerouslySetInnerHTML={{__html: message}} />
          </H1>
        </div>
      </Wrapper>
    </div>
  )
}

export default OtherPage
