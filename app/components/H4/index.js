import styled from 'styled-components'

const H4 = styled.h4`
  color: ${({ color }) => color || '#5b5b5b'};
  text-align: ${({ center }) => center ? 'center' : 'left'}
  font-family: 'helveticabold';
  margin: 5px 0;
`

export default H4
