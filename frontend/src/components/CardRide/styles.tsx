import styled from "styled-components";

export const MainDiv = styled.div`
display: flex;
gap: 15px;
max-width: 100%;
justify-content: center;
background-color: #999393;
display: flex;
margin: 20px;
border-radius: 15px;
`;

export const ContainerDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 30px;
margin-bottom: 30px;
`;

export const InfoDiv = styled.div`
display: flex;
align-items: center;
gap: 30px;
`;

export const H3 = styled.h3`
margin-left: 20px;
`;

export const Info = styled.p`
font-style: italic;
font-size: 18px;
`;

export const Button = styled.button`
width: 90px;
height: 40px;
margin-right: 15px;
border-radius: 15px;
background-color: black;
color: white;
&:hover{cursor: pointer;}
`;