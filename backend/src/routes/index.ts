import express from "express";
import ride from "./ride"

const routes = express.Router(); 

routes.get("/", (req: any, res: any) => {
    return res.json("api connected");
});

routes.use(ride);

export default routes;