import styled from 'styled-components'

const H6 = styled.h6`
  color: ${({ color }) => color || '#5b5b5b'};
  font-family: 'helveticabold';
  font-size: 10px;
  margin: 5px 0;
  text-align: ${({ center }) => center ? 'center' : 'left'}
  text-transform: ${({ uppercase }) => uppercase ? 'uppercase' : 'normal'}
`

export default H6
