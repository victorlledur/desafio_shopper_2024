import { BrowserRouter, Routes as WrapedRoutes, Route } from "react-router-dom";
import Home from './pages/Home';
import DriversPage from "./pages/Drivers";
import RidesPage from "./pages/RidesPage";
import ShowRides from "./pages/ShowRides";

export default function Routes() {
  return (
    <BrowserRouter>
      <WrapedRoutes>
        <Route path="/" element={<Home/>} />
        <Route path="/drivers" element={<DriversPage/>} />
        <Route path="/rides" element={<RidesPage/>} />
        <Route path="/showrides" element={<ShowRides/>} />
      </WrapedRoutes>
    </BrowserRouter>
  );
}