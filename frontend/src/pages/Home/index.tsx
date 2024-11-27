import React, { useState } from 'react';
import { MainDiv, TitleDiv, Input, FormDiv, Label, Form, SearchButton } from './styles';
import { estimateRide } from '../../services/mainApi/rides';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    costumerId: string;
    origins: string;
    destinations: string;
}


const Home = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState<FormValues>({
        costumerId: '',
        origins: '',
        destinations: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await estimateRide(formData);
            const jsonObject = JSON.stringify(response.data)
            localStorage.setItem('costumerId', formData.costumerId)
            localStorage.setItem('origin', formData.origins)
            localStorage.setItem('destination', formData.destinations)
            localStorage.setItem('search', jsonObject)
            navigate(`/drivers`);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error.message);
              } else {
                setErrorMessage('Ocorreu um erro inesperado.');
              }
        }
    }

    return (
        <MainDiv>
            <TitleDiv>
                <h1>Solicitação de viagem</h1>
            </TitleDiv>
            <FormDiv>
                <Form onSubmit={handleSubmit} method='POST' encType="application/json">
                    <Label htmlFor="userId">Seu ID de usuário:</Label>
                    <Input
                        type="text"
                        id="costumerId"
                        name="costumerId"
                        value={formData.costumerId}
                        onChange={handleChange}
                    />

                    <Label htmlFor="startAddress">Endereço de partida:</Label>
                    <Input
                        type="text"
                        id="origins"
                        placeholder='Avenida Paulista 1578 São Paulo SP Brasil'
                        name="origins"
                        value={formData.origins}
                        onChange={handleChange}
                    />

                    <Label htmlFor="endAddress">Endereço de destino:</Label>
                    <Input
                        type="text"
                        id="destinations"
                        placeholder='Rua das Flores 123 São Paulo SP Brasil'
                        name="destinations"
                        value={formData.destinations}
                        onChange={handleChange}
                    />
                    <div>
                    {errorMessage && <p>{errorMessage}</p>}
                    </div>
                    <SearchButton type="submit">Buscar</SearchButton>
                </Form>
            </FormDiv>
        </MainDiv>
    );
};

export default Home;