import styled from 'styled-components'

const H2 = styled.h2`
  font-size: 18px;
  color: ${({ color }) => color || '#000'};
  text-align: ${({ center }) => center ? 'center' : 'left'}
  font-weight: 400;
`

export default H2
