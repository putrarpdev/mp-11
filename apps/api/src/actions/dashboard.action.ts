import prisma from "@/prisma";
import { Request } from "express";

class DashboardAction {
    getEventCategoryCounts() {
        throw new Error("Method not implemented.");
    }
    public async getDashboardData() {
        try {
            const attendees = await prisma.event_transactions.count()

            const currentYear: number = new Date().getFullYear()
            const startOfYear = new Date(currentYear, 0,1)
            const endOfYear = new Date(currentYear + 1,0,0)
            const ticketYearly = await prisma.event_transactions.count({
                where: {
                    transaction_date: {
                        gte: startOfYear,
                        lt: endOfYear,
                    }
                }
            })

            const currentMonth = new Date().getMonth()
            const startOfMonth = new Date(currentYear, currentMonth, 1)
            const endOfMonth = new Date(currentYear, currentMonth + 1,0)
            const ticketMonthly = await prisma.event_transactions.count({
                where: {
                    transaction_date: {
                        gte: startOfMonth,
                        lt: endOfMonth,
                    }
                }
            })

            const event = await prisma.events.count()

            // const eventCategories = await prisma.event_categories.groupBy({
            //     by: ['name'],
            //     _count: {
            //         id: true,
            //     },
            // })

            return {
                attendees,
                ticketYearly,
                ticketMonthly,
                event,
                // eventCategories
            }

        } catch (err) {
            throw err
        }
    }

    // public async getEventCategoryCounts() {
    //     try {
    //         const eventCategories = await prisma.event_categories.groupBy({
    //             by: ['name'],
    //             _count: {
    //                 id: true,
    //             },
    //         })
            
    //         return eventCategories;
    //     } catch (err) {
    //         throw err
    //     }
    // }

}

export default new DashboardAction();