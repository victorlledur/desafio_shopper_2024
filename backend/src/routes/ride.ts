import express from "express";
import rideController from "../controllers/ride";

const routes = express.Router();

routes.post("/ride/estimate", rideController.estimateRide);
routes.patch("/ride/confirm", rideController.confirmRide);
routes.get("/rides/:costumerId/:driverId?", rideController.findRides);

export default routes