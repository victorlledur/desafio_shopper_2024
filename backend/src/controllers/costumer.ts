// import { NextFunction, Request, Response } from "express";
// import { prisma } from "../database/index";

// const costumerController = {
//     async createCostumer(req: Request, res: Response ) {
//         try {
//           const { id, name } = req.body
                  
//           const newCostumer = await prisma.costumer.create({
//             data: { 
//                 id: id,
//                 name: name
//              },
//           })
    
//           return res.status(201).json({newCostumer})

//           } catch (error) {
//           return res.status(400).send({ error: error })
//         }
//       },
// }

// export default costumerController;