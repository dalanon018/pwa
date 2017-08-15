import styled from 'styled-components'

const H1 = styled.h1`
  color: #5b5b5b;
  font-family: 'helveticamedium';
  font-weight: 100;
  margin-bottom: 0.25em;
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  @media (min-width: 320px) {
    font-size: 16px;
    letter-spacing: 4px;
  }

  @media (min-width: 768px) {
    margin: 20px 0 !important;
  }
`

export default H1
