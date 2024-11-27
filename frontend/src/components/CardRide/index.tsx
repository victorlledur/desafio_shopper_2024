import { MainDiv, InfoDiv, ContainerDiv, H3, Button, Info } from "./styles"

interface CardDriverProps {
    id:string;
    date: string;
    name: string;
    origin: string;
    destination: string;
    distance: number;
    duration: number
    value: number;
}

function CardRide(props: CardDriverProps) {

return (
    <MainDiv key={props.id}>
        <ContainerDiv>
            <InfoDiv>
                <H3>Data e hora da viagem</H3>
                <Info>{props.date}</Info>
            </InfoDiv>
            <InfoDiv>
                <H3>Nome do motorista</H3>
                <Info>{props.name}</Info>
            </InfoDiv>
            <InfoDiv>
                <H3>Origem</H3>
                <Info>{props.origin}</Info>
            </InfoDiv>
            <InfoDiv>
                <H3>Destino</H3>
                <Info>{props.destination}</Info>
            </InfoDiv>
            <InfoDiv>
                <H3>Distância</H3>
                <Info>{props.distance}</Info>
            </InfoDiv>
            <InfoDiv>
                <H3>Tempo do percurso</H3>
                <Info>{props.duration}</Info>
            </InfoDiv>
            <InfoDiv>
                <H3>Valor</H3>
                <Info>R$ {props.value}</Info>
            </InfoDiv>
        </ContainerDiv>        
    </MainDiv>
);
}
export default CardRide;