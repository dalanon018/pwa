import styled from 'styled-components'

export const BannerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .loader-image {
    background: url(${props => props.background}) no-repeat center center / cover;
    height: 165px;
    width: 100%;
  }

  .dRFGT {
    width: 100%;
    
    &:first-child {
      margin-bottom: 20px;
    }
  }

  .item {
    cursor: pointer;
    
    &:last-child {
      align-self: flex-end;
    }
  }
`
