import styled from 'styled-components'

export const ListBlockWrapper = styled.div`
  margin-top: 20px;
  padding-left: 13px;
  position: relative;

  &:before {
    color: #F6A22D;
    content: '⚫';
    font-size: 10px;
    left: 0;
    line-height: 9px;
    position: absolute;
    top: 0;
  }

  &:first-child {
    margin-top: 0;
  }

  .title {
    color: #5B5B5B;
    font-family: 'helveticamedium';
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .description {
    font-family: 'helveticamedium';
  }
`
