import styled from "styled-components";

export const MainDiv = styled.body`
display: flex;
flex-direction: column;
min-height: 55rem;
height: 100%;
background-color: #ccc6c6;
`;

export const TitleDiv = styled.div`
display: flex;
justify-content: center;
padding-top: 30px;
font-size: 30px;
font-style: oblique;
`;

export const FormDiv = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
`;

export const Label = styled.label`
font-style: bold;
font-size: 30px;
color: gray;
`;

export const Input = styled.input`
border-radius: 15px;
width: 40%;
height: 30px;
border: solid 2px gray;
text-align: center;
font-size: 20px;
`;

export const CardsTitle = styled.h2`
font-style: bold;
font-size: 30px;
color: black;
`;

export const CardsDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 30px;
justify-content: center;
&.selected{
border: solid red;
}
`;

export const SearchButton1 = styled.button`
width: 300px;
height: 40px;
border-radius: 15px;
background-color: black;
color: white;
&:hover{cursor: pointer;}
`;

export const SearchButton2 = styled.button`
width: 300px;
height: 40px;
border-radius: 15px;
background-color: black;
color: white;
&:hover{cursor: pointer;}
`;