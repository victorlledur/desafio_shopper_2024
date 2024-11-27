import CardRide from "../../components/CardRide"
import moment from "moment"
import { MainDiv, TitleDiv } from "./styles"

const ShowRides = () => {
    const data = localStorage.getItem('rides')
    const rides = JSON.parse(data as any)


    
      
    return (
        <MainDiv>
            <TitleDiv>
                <h1>Historico de Viagens</h1>
            </TitleDiv>
            {rides.map((ride: any) => (
                <CardRide key={ride.id} date={moment(ride.date).format('DD/MM/YYYY HH:mm')} name={ride.id} origin={ride.origin}
                    destination={ride.destination} distance={ride.distance} duration={ride.duration} value={ride.value.toFixed(2)} {...ride}/>
            ))}
        </MainDiv>
    )
}
export default ShowRides;