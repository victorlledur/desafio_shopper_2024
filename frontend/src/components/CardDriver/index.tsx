import { MainDiv, InfoDiv, ContainerDiv, H3, Button, Info } from "./styles"
import { createRide } from "../../services/mainApi/rides";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface Review {
  rating: string;
  comment: string;
}

interface CardDriverProps {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
  distance: number
}

function CardDriver(props: CardDriverProps) {
  const navigate = useNavigate();
  const valorFinal = typeof props.value === 'number' ? props.value * props.distance : 0;
  const valorFormatado = valorFinal.toFixed(2)
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmRide = async () => {
    setIsConfirming(true);

    try {
      const apiResponseBody = JSON.parse(localStorage.getItem('search') || '{}')
      const distance = apiResponseBody?.distance as number;
      const duration = apiResponseBody?.duration as string;
      const { data } = await createRide({
        costumerId: localStorage.getItem('costumerId'),
        origin: localStorage.getItem('origin'),
        destination: localStorage.getItem('destination'),
        distance: apiResponseBody.distance,
        duration: apiResponseBody.duration,
        driverId: props.id,
        value: props.value,
      });
      alert("Viagem confirmada com sucesso!");
      navigate(`/rides`);

    } catch (error) {
      console.error('Error confirming ride:', error);


    } finally {
      setIsConfirming(false);
    }
  };
  return (
    <MainDiv>
      <ContainerDiv>
        <InfoDiv>
          <H3>Nome</H3>
          <Info>{props.name}</Info>
        </InfoDiv>
        <InfoDiv>
          <H3>Descrição</H3>
          <Info>{props.description}</Info>
        </InfoDiv>
        <InfoDiv>
          <H3>Veículo</H3>
          <Info>{props.vehicle}</Info>
        </InfoDiv>
        <InfoDiv>
          <H3>Avaliação</H3>
          <Info>{props.review.rating}</Info>
        </InfoDiv>
        <InfoDiv>
          <H3>Valor da Viagem</H3>
          <Info>R$ {valorFormatado}</Info>
        </InfoDiv>
      </ContainerDiv>
      <ContainerDiv>
        <Button type="button" disabled={isConfirming} onClick={handleConfirmRide}>
          {isConfirming ? 'Confirmando...' : 'Escolher'}
        </Button>
      </ContainerDiv>
    </MainDiv>
  );
}
export default CardDriver;