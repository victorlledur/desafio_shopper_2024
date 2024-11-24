// import { NextFunction, Request, Response } from "express";
// import { prisma } from "../database/index";

// const driverController = {
//     async createDriver(req: Request, res: Response ) {
//         try {
//           const { id, name, description, vehicle, review, value, minkm } = req.body
                  
//           const newDriver = await prisma.driver.create({
//             data: { 
//                 id: id,
//                 name: name,
//                 description: description,
//                 vehicle: vehicle,
//                 review: review,
//                 value: value,
//                 minkm: minkm
//              },
//           })
    
//           return res.status(201).json({newDriver})

//           } catch (error) {
//           return res.status(400).send({ error: error })
//         }
//       },
// }

// export default driverController;