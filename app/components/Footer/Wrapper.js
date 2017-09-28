import styled from 'styled-components'
import {
  Label
} from 'semantic-ui-react'

const Wrapper = styled.footer`
  border-top: 1px solid #AEAEAE;
  padding: 25px 15px 15px;
  text-align: center;
`

const SocialIcons = styled.div`
  img {
    height: inherit !important;
    width: 40px !important;
  }
`
const CopyRight = styled(Label)`
  border: none !important
`

export {
  Wrapper,
  SocialIcons,
  CopyRight
}
