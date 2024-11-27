import baseApi from "./config";

export function listDrivers(){
    return baseApi.get('/drivers')
}

export async function byIdDriver(props: string) {
    return baseApi.get(`/driver/${props}`);
  }