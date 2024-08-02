import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import dashboardAction from "@/actions/dashboard.action";

export class DashboardController {
    public getOrganizerEvents = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { organizer_id } = req.params;

        try {
            const events = await prisma.events.findMany({
                where: { organizer_id: parseInt(organizer_id) },
            });
            res.status(200).json({
                message: "Get organizer event success",
                data: events,
            })
        } catch (err) {
            next(err);
        }
    }

    public getEventRegistrations = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { id } = req.params;

        try {
            const registrations = await prisma.users.findMany({
                where: { id: parseInt(id) },
            });

            res.json(registrations)
        } catch (err) {
            next(err);
        }
    }

    public getEventTransactions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { event_id } = req.params;

        try {
          const transactions = await prisma.event_transactions.findMany({
            where: { event_id: parseInt(event_id) },
          });
          
          res.json(transactions);
        } catch (err) {
            next(err);
        }
    }

    public getEventStatistics = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { event_id } = req.params;

        try {
          const statistics = await prisma.event_statistics.findUnique({
            where: { id: parseInt(event_id) },
          });

          if (!statistics) {
            res.status(404).json({ message: 'Event statistics not found' });
            return
          }
          res.json(statistics);

        } catch (err) {
            next(err);
        }
    }

    public getDashboardData = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const data = await dashboardAction.getDashboardData()
        // const event = await dashboardAction.getEventCategoryCounts()

        try {
            if (!data) {
                res.status(404).json({ message: 'Dashboard data not found' });       
            }

            res.json(data);
        } catch (err) {
            next(err)
        }
    }

    // public getEventCategoryCount = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     const data = await dashboardAction.getEventCategoryCounts()

    //     try {
    //         if (!data) {
    //             res.status(404).json({ message: 'Event Category not found' })
    //             return
    //         }

    //         res.json(data)
    //     } catch (err) {
    //         next (err);
    //     }
    // }
}