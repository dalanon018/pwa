import styled from 'styled-components'

const LabelTitle = styled.p`
  font-size: 14px;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 16px;
    letter-spacing: 5px;
  }
`

const LabelPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  text-align: right;
  line-height: normal;

  .total {
    width: 100%;
    font-family: 'Roboto';
    font-size: 35px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 10px;
    margin: 0;

    @media (min-width: 1024px) {
      font-size: ${props => props.length > 4 ? '30px' : '35px'};
      line-height: 41px;
    }
  }
  .strike {
    align-self: flex-end;
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto';
    font-weight: 700;
    line-height: initial;
    text-decoration: line-through;
  }
`

export {
  LabelPrice,
  LabelTitle
}
