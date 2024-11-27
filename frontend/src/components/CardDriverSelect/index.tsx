import { CardContainer } from "./styles";

interface CardDriverSelectProps {
    id: string;
    name: string;
    vehicle: string;
    description: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

function CardDriverSelect(props: CardDriverSelectProps,) {
    return (
            <div>                
                <CardContainer className={`card${props.isSelected ?'select' : ''}`}
                    onClick={() => props.onSelect(props.id)}>
                    <div>
                        <h2>{props.name}</h2>
                    </div>
                    <div>
                        <h3>Veículo</h3>
                        <p>{props.vehicle}</p>
                    </div>
                    <div>
                        <h3>Descrição</h3>
                        <p>{props.description}</p>
                    </div>
                </CardContainer>
            </div>
    )
}
export default CardDriverSelect;