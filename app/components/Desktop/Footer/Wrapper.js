import styled from 'styled-components'
import {
  Grid
} from 'semantic-ui-react'

const Wrapper = styled.footer`
  padding: 25px 15px 15px;

  .custom-header {
    margin-bottom: 10px;
  }

  .ui.grid>.row {
    padding: 7px 0 !important;
  }
`

const HelperLinks = styled.div`
  padding: 0 40px;
  span {
    cursor: pointer;
    font-family: 'Roboto';
  }

  .item {
    position: relative;
    margin-bottom: 10px;

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
  font-size: 9px;
`

const SocialIcons = styled.div`
  img {
    height: inherit !important;
    width: 32px !important;
    margin: 0 7px;
  }
`
const FooterColumnAdjusterFlex = styled(Grid.Column)`
  display: flex !important;
`
const AppInfo = styled.div`
  text-align: left;
  margin-bottom: 20px;
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

export {
  AppInfo,
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper,
  FooterColumnWrapper,
  FooterColumnTitle,
  FooterColumnAdjusterFlex
}
