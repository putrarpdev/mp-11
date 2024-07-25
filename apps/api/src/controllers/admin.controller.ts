// import { Request, Response, NextFunction } from "express";
// import prisma from "@/prisma";

// export class AdminController {
//     public getEventList = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         try {
//             const events = await prisma.events.findMany();
//             res.json(events);
//         } catch (err) {
//             next(err);
//         }
//     };

//     public getEventDetails = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { id } = req.params;
//         try {
//             const event = await prisma.events.findUnique({
//                 where: { id: parseInt(id) },
//                 include: {
//                     event_reviews: true,
//                     event_statistics: true,
//                     event_transactions: true,
//                     event_categories: true,
//                     event_locations: true,
//                     promotions: true,
//                     tickets: true,
//                     users: true,
//                 },
//             });

//             if (!event) throw new Error("Event not found!");

//             res.status(200).json({
//                 message: "Get event success",
//                 data: event,
//             });
//         } catch (err) {
//             next(err);
//         }
//     }

//     public getEventStatistics = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { id } = req.params;
//         try {
//             const statistics = await prisma.event_statistics.findUnique({
//                 where: {
//                     id: parseInt(id)
//                 },
//             });

//             if (!statistics) {
//                 res.status(404).json({ message: "Event statistics not found!" })
//                 return;
//             }
//             res.json(statistics)
//         } catch (err) {
//             next(err);
//         }
//     }
// }