import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/index";

const driverController = {
    async listDriver(req: Request, res: Response): Promise<any> {
        try {
            const listdrivers = await prisma.driver.findMany();
            res.status(200).json(listdrivers);
        } catch (error) {
            return res.status(400).send({ error: error })
        }
    },
    async byIdDriver(req: Request, res: Response): Promise<any> {
        try {

            const { id } = req.params;

            const driver = await prisma.driver.findUnique({
                where: {
                    id,
                }
            });

            if (!driver) {
                res.status(404).json("Motorista não encontrado")
            };

            res.status(200).json(driver)

        } catch (error) {
            return res.status(400).send({ error: error })
        }
        // async createDriver(req: Request, res: Response ) {
        //     try {
        //       const { id, name, description, vehicle, review, value, minkm } = req.body

        //       const newDriver = await prisma.driver.create({
        //         data: { 
        //             id: id,
        //             name: name,
        //             description: description,
        //             vehicle: vehicle,
        //             review: review,
        //             value: value,
        //             minkm: minkm
        //          },
        //       })

        //       return res.status(201).json({newDriver})

        //       } catch (error) {
        //       return res.status(400).send({ error: error })
        //     }
        //   },
    }
}

export default driverController;