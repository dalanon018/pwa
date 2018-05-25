import styled from 'styled-components'
import {
  Grid,
  List
} from 'semantic-ui-react'

const Wrapper = styled.footer`
  margin-top: 50px;
  padding: 25px 15px 15px;
  position: relative;

  &.sticky {
    bottom: 0;
    left: 0;
    position: fixed !important;
    width: 100%;
  }

  .custom-header {
    margin-bottom: 10px;
  }

  .ui.grid>.row {
    padding: 7px 0 !important;
  }

  // &:before {
  //   content: '';
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  //   width: 300px;
  //   height: 74px;

  //   background-image: url(${({ backgroundImage }) => backgroundImage});
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   background-position: left bottom;
  // }

  // &:after {
  //   content: '';
  //   position: absolute;
  //   right: 0;
  //   bottom: 0;
  //   width: 300px;
  //   height: 74px;

  //   background-image: url(${({ backgroundImage }) => backgroundImage});
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   background-position: left bottom;
  //   transform: scaleX(-1);
  // }
`

const HelperLinks = styled.div`
  // padding: 0 40px;
  span {
    cursor: pointer;
    font-family: 'Roboto';
  }

  .item {
    margin-bottom: 10px;
    // margin-left: 10px !important;
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
  margin-top: 20px !important;
  font-size: 12px;
`

const SocialIcons = styled.div`
  margin-top: 10px;

  img {
    height: inherit !important;
    width: 36px !important;
  }
`
const FooterColumnAdjusterFlex = styled(Grid.Column)`
  display: flex !important;
`
const AppInfo = styled.div`
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  // justify-content: space-around;

  section {
    margin-left: 20px;
    line-height: 1px;
  }

  img {
    width: 40px;
    margin-right: 3px;

    &.delivery-icon {
      width: 55px;
    }

    &.return-icon {
      margin: 0 10px 0 8px;
    }
  }
`

const FooterColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const FooterColumnTitle = styled.div``

const FooterSocialMediaWrapper = styled.div`
  // align-self: flex-end;
`

const IconItem = styled.div`
  &.fb-icon {
    background: url(${props => props.icon})no-repeat 2px 0 / cover;
    height: 44px;
    width: 53px;
  }

  &.ig-icon {
    background: url(${props => props.icon})no-repeat -69px 0 / cover;
    height: 44px;
    margin-left: 5px;
    width: 52px;

    @media (min-width: 375px) {
      margin-left: 0;
    }
  }

  &.mail-icon {
    background: url(${props => props.icon})no-repeat -139px 0 / cover;
    height: 44px;
    width: 51px;
  }
`

const CustomItem = styled(List.Item)`
  margin: 0 15px !important;
`

export {
  AppInfo,
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper,
  FooterColumnWrapper,
  FooterColumnTitle,
  FooterColumnAdjusterFlex,
  FooterSocialMediaWrapper,
  IconItem,
  CustomItem
}
