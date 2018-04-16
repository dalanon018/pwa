import styled from 'styled-components'
import { List } from 'semantic-ui-react'

const Wrapper = styled.footer`
  margin-bottom: 15px;
  padding: 25px 15px 15px;
  text-align: center;

  .custom-header {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .ui.grid>.row {
    padding: 7px 0 !important;
  }
`

const HelperLinks = styled.div`
  span {
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 14px;
    color: #2F2F2F;
  }

  .item {
    position: relative;
    &:first-child {
      &:before {
        content: '';
      }
    }
  }

  @media (min-width: 375px) {
    a {
      letter-spacing: 1px;
    }
  }
`

const CopyRight = styled.p`
  font-size: 10px;
`

const SocialIcons = styled.div`
  // img {
  //   height: inherit !important;
  //   width: 32px !important;
  //   margin: 0 7px;
  // }
`

const IconItem = styled.div`
  &.fb-icon {
    background: url(${props => props.icon})no-repeat 2px 0 / cover;
    height: 44px;
    width: 46px;
  }

  &.twitter-icon {
    background: url(${props => props.icon})no-repeat -69px 0 / cover;
    height: 44px;
    margin-left: 5px;
    width: 47px;

    @media (min-width: 375px) {
      margin-left: 0;
    }
  }

  &.mail-icon {
    background: url(${props => props.icon})no-repeat -139px 0 / cover;
    height: 44px;
    width: 50px;
  }
`

const CustomItem = styled(List.Item)`
  margin: 0 15px !important;
`

export {
  CopyRight,
  HelperLinks,
  SocialIcons,
  IconItem,
  Wrapper,
  CustomItem
}
