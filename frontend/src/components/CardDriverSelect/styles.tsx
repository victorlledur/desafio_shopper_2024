import styled from "styled-components";

export const CardContainer = styled.div`
width: 400px;
height: 300px;
padding: 20px;
background-color: #999393;
display: flex;
flex-direction: column;
border-radius: 15px;
cursor: pointer;

&.cardselect {
    border: solid red;
}
`;