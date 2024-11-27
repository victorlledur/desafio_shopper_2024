import express from "express";
import ride from "./ride";
import drivers from "./driver";

const routes = express.Router(); 

routes.get("/", (req: any, res: any) => {
    return res.json("api connected");
});

routes.use(ride);
routes.use(drivers);

export default routes;