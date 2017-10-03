import styled from 'styled-components'

const Wrapper = styled.footer`
  border-top: 1px solid #F0F0F0;
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
    color: #aeaeae;
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
    // &:before {
    //   color: #aeaeae;
    //   bottom: 5px;
    //   display: block
    //   content: '|';
    //   left: -8px;
    //   position: absolute;
    // }
  }

  @media (min-width: 375px) {
    a {
      letter-spacing: 1px;
    }
  }
`

const CopyRight = styled.p`
  color: #5b5b5b;
  font-size: 9px;
`

const SocialIcons = styled.div`
  img {
    height: inherit !important;
    width: 32px !important;
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
        color: #AEAEAE;
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
