import styled from "styled-components";


export const Card = styled.div`
    width: 500px;
    padding: 20px 30px;
    > *{
        padding: 20px 10px;
    }
    border: 1px #f3f3f3 solid;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    color: #fff;
`;

export const ContainerMaxMin = styled.div`
    display:flex;
    aling-items: center;
    justfy-content: space-between;
    gap: 20px;
    border: 1px solid #fff;
      border-radius: 10px;
      padding: 10px;
`;
export const ContainerTempAtual = styled.div`

    font-size: 4rem
`;
export const ContainerLocalInfo = styled.div`
    display:flex;
    aling-items: center;
    justfy-content: space-between;    
    gap: 20px;
   
`;
export const ContainerLocalName = styled.div`
    font-size: 1.6rem;
    display:flex;
    align-items:center;
    justy-content: space-between;

`;
export const ContainerInfoWeather = styled.div`
    .icon{
        font-size: 2rem;
    }
    p:nth-child(2) {
        font-size: 1.6rem
    }
    
     
`;