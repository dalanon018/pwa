import styled from 'styled-components'

const PopupWrapper = styled.div`
  background-color: green;
  color: #FFFFFF;
  position: fixed;
  height: ${props => props.toggle ? '100vh' : '0'};
  transition: all .3s ease;
  overflow: auto;
  z-index: 999999;
  bottom: 0;
  left: 0;
  width: 100%;
`

const PopupContainer = styled.div`
  padding: 10px;
`

export {
  PopupWrapper,
  PopupContainer
}
