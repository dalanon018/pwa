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

  @media (min-width: 1024px) {
    height: 80px;
  }
`

export const CategoryWrapper = styled.div`
  margin: 30px 0;
`

export const BackgroundLay = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
