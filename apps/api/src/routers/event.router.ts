import { EventController } from '@/controllers/event.controller';
import { IRoutes } from '@/interfaces/route.interfaces';
import { Router } from 'express';

export class EventRouter implements IRoutes {
  public router: Router = Router()
  public user = new EventController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/create-event', this.user.createEventController);
    this.router.get('/events', this.user.getEventController);
  }
}
