import styled from 'styled-components'

const H3 = styled.h3`
  color: ${({ color }) => color || '#5b5b5b'};
  font-family: 'helveticabold';
  font-weight: ${({ weight }) => weight || '600'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '1px'};
  margin: 20px 0;
  text-align: ${({ center }) => center ? 'center' : 'left'}
  text-transform: ${({ uppercase }) => uppercase ? 'uppercase' : 'normal'}
`

export default H3
