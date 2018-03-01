import styled from 'styled-components'

const H5 = styled.h5`
  font-family: 'helveticabold';
  color: ${({ color }) => color || '#5b5b5b'};
  text-align: ${({ center }) => center ? 'center' : 'left'}
  margin: 5px 0;
`

export default H5
