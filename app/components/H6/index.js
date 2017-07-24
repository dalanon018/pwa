import styled from 'styled-components'

const H6 = styled.h6`
  color: ${({ color }) => color || '#5b5b5b'};
  text-align: ${({ center }) => center ? 'center' : 'left'}
  font-family: 'helveticabold';
  margin: 5px 0;
  font-size: 10px;
`

export default H6
