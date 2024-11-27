import baseApi from "./config";

export async function estimateRide(formData: any) {
    return baseApi.post('/ride/estimate', {
        costumerId: formData.costumerId,
        origins: formData.origins,
        destinations: formData.destinations
    })
}

export function createRide(req: any) {
    return baseApi.patch("/ride/confirm", {
        costumerId: req.costumerId,
        date: "",
        origin: req.origin,
        destination: req.destination,
        distance: req.distance,
        duration: req.duration,
        driverId: req.driverId,
        value: req.value,
    });
}

export async function listRides(url: any) {
    try {
        return baseApi.get(url);        
      } catch (error) {
        console.error('Erro ao buscar as corridas:', error);
        throw error;
      }
  }