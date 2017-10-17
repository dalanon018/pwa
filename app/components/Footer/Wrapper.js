import styled from 'styled-components'

const Wrapper = styled.footer`
  margin-bottom: 15px;
  padding: 25px 15px 15px;
  text-align: center;

  .custom-header {
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
    font-size: 11px;
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
  font-size: 9px;
`

const SocialIcons = styled.div`
  img {
    height: inherit !important;
    width: 32px !important;
    margin: 0 7px;
  }
`

const AppInfo = styled.div`
  align-items: center;
  text-align: left;
  display: flex;

  section {
    line-height: 1px;
    span {
      font-size: 8px !important;

      &:last-child {
        font-size: 7px !important;
      }
    }
  }

  img {
    width: 20px;
    margin-right: 3px;
  }
`

export {
  AppInfo,
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper
}
