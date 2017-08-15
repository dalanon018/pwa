import styled from 'styled-components'

const Wrapper = styled.footer`
  border-top: 3px solid #aeaeae;
  padding: 25px 15px 15px;
  text-align: center;

  .custom-header {
    font-size: 18px;
  }
`

const HelperLinks = styled.div`
  margin-bottom: 10px;
  span {
    color: #aeaeae;
    cursor: pointer;
    font-size: 11px;
  }

  .item {
    position: relative;
    &:first-child {
      &:before {
        content: '';
      }
    }
    &:before {
      bottom: 3px;
      content: '|';
      left: -8px;
      position: absolute;
    }
  }

  @media (min-width: 375px) {
    a {
      letter-spacing: 1px;
    }
  }
`

const CopyRight = styled.p`
  color: #5b5b5b;
  font-family: 'helveticabold';
  font-size: 9px;
`

const SocialIcons = styled.div`
  margin: 17px 0;
  img {
    height: inherit !important;
    width: 40px !important;
  }
`

export {
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper
}
