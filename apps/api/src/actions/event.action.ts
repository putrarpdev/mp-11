import prisma from "@/prisma";
import { Request } from "express";

class EventAction {
    public async createEvent(
        title: string,
        organizer_id: number,
        date: Date,
        description: string,
        price: number,
        category_id: number,
        location_id: number,
        available_seats: number
    ) {
        try {
            const user = await prisma.events.create({
                data: {
                    title,
                    organizer_id,
                    date,
                    description,
                    price,
                    category_id,
                    location_id,
                    available_seats
                },
            });

            return user;
        } catch (err) {
            throw err;
        }
    }

    public async findEventByTitle(req: Request) {
        try {
            const {
              title,
              category_id,
              location_id,
              ticket_type,
            //   page,
            //   pageSize,
            } = req.query;
      
            console.log(req.query);
      
            let filter = {};
      
            if (title) filter = { ...filter, title: title };
            if (category_id) filter = { ...filter, category_id: Number(category_id) };
            if (location_id) filter = { ...filter, location_id: Number(location_id) };
            if (ticket_type) filter = { ...filter, ticket_type: ticket_type };
      
            const events = await prisma.events.findMany({
            //   skip: (Number(page) - 1) * Number(pageSize),
            //   take: Number(pageSize),
              where: {
                AND: [
                  {
                    ...filter,
                  },
                ],
              },
            });
      
            return events;
          } catch (err) {
            throw err;
          }
    }

    public async findEventByCategory(category_id: number) {
        try {
            const user = await prisma.events.findMany({
                where: {
                    category_id,
                }
            })

            return user;
        } catch (err) {
            throw err;
        }
    }

    public async findEventByLocation(location_id: number) {
        try {
            const user = await prisma.events.findMany({
                where: {
                    location_id,
                }
            })

            return user;
        } catch (err) {
            throw err;
        }
    }
}

export default new EventAction();