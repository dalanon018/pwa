import styled from 'styled-components'
import {
  Grid
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

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 300px;
    height: 160px;

    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left bottom;
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 160px;

    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left bottom;
    transform: scaleX(-1);
  }
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
    width: 32px !important;
  }
`
const FooterColumnAdjusterFlex = styled(Grid.Column)`
  display: flex !important;
`
const AppInfo = styled.div`
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;

  section {
    margin-left: 20px;
    line-height: 1px;
  }

  img {
    width: 40px;
    margin-right: 3px;
  }
`

const FooterColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const FooterColumnTitle = styled.div``

const FooterSocialMediaWrapper = styled.div`
  align-self: flex-end;
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
  FooterSocialMediaWrapper
}
