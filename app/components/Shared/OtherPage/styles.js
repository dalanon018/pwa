import styled from 'styled-components'

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 80vh;
    justify-content: center;
    padding: 0 30px;
    

    img {
        margin: 0 auto;
        width:50%;
    }

    @media (min-width: 320px){
        height: 80vh;

        h1 {
            font-family: 'helveticabold'
            font-size: 12px;
            height:100% !important;
        }
    }

    @media (min-width: 375px){
        h1 {
            font-size: 18px;
        }
    }

    @media (min-width: 768px){
        height: 70vh;

        h1 {
            font-size: 22px;
        }

        img {
            width: 50%;
        }
    }
`
