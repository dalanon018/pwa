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
    position: relative;
  }

  @media (min-width: 767px) {
    height: 150px;
  }
`

export const CategoryWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    padding: 0 250px;
  }
`

export const BackgroundLay = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
