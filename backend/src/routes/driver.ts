import express from "express";
import driverController from "../controllers/driver";

const routes = express.Router();

routes.get("/drivers", driverController.listDriver);
routes.get("/driver/:id", driverController.byIdDriver)

export default routes