import express from "express";
import rideController from "../controllers/ride";

const routes = express.Router();

routes.get("/ride/estimate", rideController.estimateRide);
routes.post("/ride/confirm", rideController.confirmRide);
routes.get("/rides/", rideController.findRides);

export default routes