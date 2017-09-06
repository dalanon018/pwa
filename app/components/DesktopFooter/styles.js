import styled from 'styled-components'

const DesktopWrapper = styled.div`
margin: 0 auto;
max-width: calc(1200px + 16px * 2);
`

const Wrapper = styled.footer`
border-top: 3px solid #aeaeae;
margin-top: 30px;
padding: 12px 15px 15px;

.custom-header {
  font-size: 13px;
  letter-spacing: 2px;
  margin: 0 0 7px 0 !important;
  text-align: left;
}
`

const HelperLinks = styled.div`
height: 0;
margin-bottom: 10px;
margin-top: -5px !important;
text-align: right;

span {
  color: #5B5B5B;
  cursor: pointer;
  font-family: 'helveticalight';
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.item {
  position: relative;
  margin-left: 20px !important;
  &:first-child {
    &:before {
      content: '';
    }
  }
  &:before {
    bottom: 3px;
    color: #5B5B5B;
    content: '|';
    left: -13px;
    position: absolute;
  }

  @media (min-width: 992px) {
    margin-left: 40px !important;

    &:before {
      left: -25px;
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
color: #5B5B5B;
cursor: pointer;
font-family: 'helveticalight';
font-size: 11px;
font-weight: bold;
letter-spacing: 1px;
margin-left: 15px;
margin-top: 11px;
text-align: right;

// &::first-letter {
//     font-size: 17px;
// }
`

const SocialIcons = styled.div`
.item {
  margin-left: 10px !important;
}

img {
  height: inherit !important;
  width: 29px !important;
}
`

export {
    DesktopWrapper,
    Wrapper,
    HelperLinks,
    CopyRight,
    SocialIcons
  }
