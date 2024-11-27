import React, { useState, useEffect } from 'react';
import CardDriver from '../../components/CardDriver';
import StaticMap from '../../components/Map';
import { Container, CardsDiv, MapDiv } from './styles';

function DriversPage() {
    const data = localStorage.getItem('search')
    const drivers = JSON.parse(data as any)
    console.log(data, drivers, drivers.origin.latitude, drivers.origin.longitude)
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    const midLat = (drivers.origin.latitude + drivers.destination.latitude) /2;
    const midLng = (drivers.origin.longitude + drivers.destination.longitude) /2;
  
    return (
        <Container>
            <CardsDiv>
                <div className="driver-list">
                    {drivers.options.map((driver: any) => (
                        <CardDriver key={driver.id} {...driver} distance={drivers.distance} />
                    ))}
                </div>
            </CardsDiv>
            <MapDiv>
                <StaticMap origin={{ lat: drivers.origin.latitude, lng: drivers.origin.longitude, color:"red"}} destination={{ lat: drivers.destination.latitude, lng: drivers.destination.longitude, color:"red"}} midpoint={{lat:midLat, lng:midLng}} apiKey ={key as string} />
            </MapDiv>
        </Container>
    );
}

export default DriversPage;