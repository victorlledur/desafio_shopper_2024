import { Request, Response } from "express";
import axios from 'axios';
import { prisma } from "../database";

interface Address {
  address: string;
}

interface DistanceMatrixResponse {
  rows: Array<{
    elements: Array<{
      status: string;
      duration: {
        value: number;
        text: string;
      };
      distance: {
        value: number;
        text: string;
      };
    }>;
  }>;
  status: string;
}

interface RideRequest {
  costumerId: string;
  origins: string;
  destinations: string;
}

async function calculateDistanceMatrix(origin: Address[], destination: Address[], apiKey: string): Promise<DistanceMatrixResponse> {
  const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  const params = {
    origins: origin,
    destinations: destination,
    key: apiKey,
  };
  const response = await axios.get<DistanceMatrixResponse>(baseUrl, { params });
  return response.data;
}

async function getCoordinates(address: string, apiKey: string): Promise<{ lat: number; lng: number }> {
  try {
    const geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const params = {
      address,
      key: apiKey,
    };
    const response = await axios.get(geocodingUrl, { params });
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error('Erro ao encontrar as coordenadas', error);
    return { lat: 0, lng: 0 };
  }
}

const rideController = {
  async estimateRide(req: Request, res: Response): Promise<any> {
    try {
      const { costumerId, origins, destinations }: RideRequest = req.body;

      if (!costumerId || costumerId.length === 0 || !origins || origins.length === 0 || !destinations || destinations.length === 0) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      if (origins === destinations) {
        return res.status(401).json({ error: 'Os endereços de origem e destino, não podem ser o mesmo endereço' });
      }
      const apiKey: string = process.env.GOOGLE_API_KEY as string;
      const originCoords = await getCoordinates(origins, apiKey);
      const destinationCoords = await getCoordinates(destinations, apiKey);
      const distanceMatrixResponse = await calculateDistanceMatrix(origins as unknown as Address[], destinations as unknown as Address[], apiKey);

      const distanceInMeters = distanceMatrixResponse.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInMeters / 1000;
      const duration = distanceMatrixResponse.rows[0].elements[0].duration.text;

      const availableDrivers = await prisma.driver.findMany({
        where: {
          minkm: { lte: distanceInKm },
        },
      });

      const options = availableDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: driver.value,
      }));

      const responseBody = {
        origin: { latitude: originCoords.lat, longitude: originCoords.lng },
        destination: { latitude: destinationCoords.lat, longitude: destinationCoords.lng },
        distance: distanceInKm,
        duration,
        options,
        routeResponse: distanceMatrixResponse,
      };

      return res.status(200).json({ responseBody });
    } catch (error) {
      console.error('Ocorreu um erro ao estimar viagem:', error);
      return res.status(500).json({ error: 'Um erro ocorreu enquanto estimava a viagem' });
    }
  },

  async confirmRide(req: Request, res: Response): Promise<any> {
    try {

      const { costumerId, origin, destination, distance, duration, driverId, value } = req.body;

      if (origin === destination) {
        return res.status(401).json({ error: 'Os endereços de origem e destino, não podem ser o mesmo endereço' });
      }
      if (!costumerId || costumerId.length === 0 || !origin || origin.length === 0 || !destination || destination.length === 0) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      const confirmedCostumer = await prisma.costumer.findFirst({
        where: {
          id: costumerId
        }
      })
      if (!confirmedCostumer) {
        return res.status(400).json({ error: 'Cliente não encontrado' });
      }
      const confirmedDriver = await prisma.driver.findFirst({
        where: {
          id: driverId
        }
      })
      if (!confirmedDriver) {
        return res.status(404).json({ error: 'Motorista não encontrado' });
      }
      if (confirmedDriver.minkm > distance) {
        return res.status(406).json({ error: 'Quilometragem inválida para o motorista' });
      }
      const today = Date.now();
      const formatedDate = new Date(today)

      const price = confirmedDriver.value * distance

      const newRide = await prisma.ride.create({
        data: {
          date: formatedDate,
          origin,
          destination,
          distance,
          duration,
          value: price,
          driverId,
          costumerId,
        },
      });
      return res.status(200).json({ message: 'Operação realizada com sucesso', ride: newRide });

    } catch (error) {
      console.error('Erro ao confirmar a viagem:', error);
      return res.status(400).json({ error: 'Os dados fornecidos no corpo da requisição são inválidos' });
    }
  },

  async findRides(req: Request, res: Response): Promise<any> {
    try {
      const { costumerId, driverId } = req.query;

      if (typeof costumerId !== 'string') {
        return res.status(400).json("O parâmetro 'costumerId' deve ser uma string");
      }
      if(!costumerId || costumerId.length === 0){
        res.status(400).json("A id do usuario não pode estar em branco")
      }
      const confirmedDriver = await prisma.driver.findFirst({
        where:{
          id: driverId as string,
        }
      })
      if(!confirmedDriver){
        res.status(404).json("Motorista não encontrado")
      }

      const rides = await prisma.ride.findMany({
        where: {
          costumerId: costumerId as string,
          ...(typeof driverId === 'string' && { driverId })
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json(rides);
    } catch (error) {
      res.status(400).json("Viagens não encontradas")
    }
  },

}

export default rideController;

