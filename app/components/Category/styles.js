import styled from 'styled-components'

export const CategoryBlock = styled.div`
  align-items: center;
  background: url(${props => props.background})no-repeat center center /  cover;
  cursor: pointer;
  display: flex;
  height: 100px;
  justify-content: center;
  position: relative;
  
  span {
    color: #FFFFFF !important;
    position: relative;
  }

  @media (min-width: 767px) {
    height: 150px;
  }
`

export const BackgroundLay = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
