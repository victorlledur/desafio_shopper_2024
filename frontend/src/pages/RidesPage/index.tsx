import React, { useEffect, useState } from 'react';
import { MainDiv, TitleDiv, FormDiv, Form, Label, Input, CardsTitle, SearchButton1, SearchButton2, CardsDiv } from './styles';
import CardDriverSelect from '../../components/CardDriverSelect';
import { listDrivers } from '../../services/mainApi/driver';
import { listRides } from '../../services/mainApi/rides';
import { useNavigate } from 'react-router-dom';

interface Driver {
    id: string;
    name: string;
    vehicle: string;
    description: string;
}

const RidesPage = () => {
    const navigate = useNavigate()
    const [drivers, setDrivers] = useState<Driver[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await listDrivers();
            setDrivers(response.data as Driver[]);
        };

        fetchData();
    }, []);

    const [costumerId, setCostumerId] = useState('');
    const [driverId, setDriverId] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        console.log("valor do input", value);
        setCostumerId(value);
    };

    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

    const handleDriverSelect = (driverId: string) => {
        setSelectedDriverId(driverId);
        setDriverId(driverId);
    };

    const handleSubmit = async (event: any) => {
        try {
            event.preventDefault();
            const url = `/rides/${costumerId}/${driverId ? driverId : ''}`;
            event.stopPropagation()
            const response = await listRides(url);
            const data = response.data;
            localStorage.setItem('rides', JSON.stringify(data));
            navigate(`/showrides`);
        } catch (error) {
            console.error('Erro ao buscar viagens:', error);
        }
    }

    return (
        <MainDiv>
            <TitleDiv>
                <h1>Histórico de viagens</h1>
            </TitleDiv>
            <FormDiv>
                <Form onSubmit={handleSubmit}>
                    <Label htmlFor="userId">Seu ID de usuário:</Label>
                    <Input
                        type="text"
                        id="costumerId"
                        name="costumerId"
                        value={costumerId}
                        onChange={handleChange}
                    />
                    <div>
                        <CardsTitle>Selecione o motorista</CardsTitle>
                    </div>
                    <div>
                        <CardsDiv className="driver-list">
                            {drivers.map((driver: any) => (
                                <CardDriverSelect key={driver.id}
                                    isSelected={driver.id === selectedDriverId}
                                    onSelect={() => handleDriverSelect(driver.id)}
                                    {...driver}
                                />
                            ))}
                        </CardsDiv>
                    </div>
                    <div className="search-buttons">
                        <SearchButton1 type='submit'>Buscar com motorista selecionado</SearchButton1>
                        <div>
                            <SearchButton2 onClick={() => handleSubmit}>
                                Buscar por todas as viagens
                            </SearchButton2>
                        </div>
                    </div>
                </Form>
            </FormDiv>
        </MainDiv>
    );
};

export default RidesPage;