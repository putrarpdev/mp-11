import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import { Event } from '@/types/express/event';
import eventAction from '@/actions/event.action';

export class EventController {
  public createEventController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, organizer_id, date, description, price, category_id, location_id, available_seats } = req.body;

      const user = await prisma.$transaction(async (client) => {
        const user = await client.events.create({
          data: {
            title,
            organizer_id: Number(organizer_id),
            date: new Date(date),
            description,
            price,
            category_id: Number(category_id),
            location_id: Number(location_id),
            available_seats: Number(available_seats)
          },
        });

        // await client.user_roles.create({
        //   data: {
        //     user_id: user.id
        //   }
        // })

        return user;
      })

      res.status(200).json({
        message: "Create event success",
        data: user,
      });
    } catch (err) {
      next (err)
    };
  };

  public getEventsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, date, location_id, category_id } = req.query;
      let filter = {};

      if (title) filter = { ...filter, title };
      if (date) filter = { ...filter, date };
      if (location_id) filter = { ...filter, location_id };
      if (category_id) filter = { ...filter, category_id };

      const user = await prisma.events.findMany({
        where: {
          ...filter,
        }
      });

      res.status(200).json({
        message: "Get event success",
        data: user,
      });
    } catch (err) {
      next (err)
    }
  }

  public getEventController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const event = await eventAction.findEventByTitle(req);

      if (!event) throw new Error("Event not found!");

      res.status(200).json({
        message: "Get event success",
        data: event,
      })
    } catch (err) {
      next (err)
    }
  }
}
