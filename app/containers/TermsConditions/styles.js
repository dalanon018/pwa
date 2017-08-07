import styled from 'styled-components'

export const ContainerWrapper = styled.div`
  margin: 20px 0;

  &:first-child {
    margin-top: 0;
  }

  #termsandconditions, #termsandconditions-1, h2 {
    color: #5B5B5B;
    font-family: 'helveticamedium';
    font-size: 11px;
    padding-left: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;

    &:before {
      color: #F6A22D;
      content: '⚫';
      font-size: 10px;
      left: 0;
      line-height: 9px;
      position: absolute;
      top: 2px;
    }
  }

  p {
    font-family: 'helveticamedium';
  }

  hr {
    display: none;
  }
`
