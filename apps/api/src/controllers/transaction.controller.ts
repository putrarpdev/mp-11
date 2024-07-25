// import { Request, Response, NextFunction } from "express";
// import prisma from "@/prisma";

// export class TransactionsController {
//     public getAttendeeRegistrations = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { id } = req.params;
//         try {
//             const transactions = await prisma.event_transactions.findMany({
//                 where: {
//                     event_id: parseInt(id),
//                     is_deleted: false,
//                 },
//                 include: {
//                     users: true,
//                     promotions: true,
//                 },
//             });

//             res.json(transactions);
//         } catch (err) {
//             next(err);
//         }
//     };
// }