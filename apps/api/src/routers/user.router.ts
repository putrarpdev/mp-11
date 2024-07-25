import { UserController } from '@/controllers/user.controller';
import { IRoutes } from '@/interfaces/route.interfaces';
import { Router } from 'express';
import { UserMiddleware } from '@/middlewares/user.middleware';


export class UserRouter implements IRoutes {
  public router: Router = Router()
  private user = new UserController()
  private guard = new UserMiddleware()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/users', this.user.getUsersController);
    this.router.get("/users/profile", this.guard.verifyToken, this.user.getUserController);
    this.router.post('/register', this.user.createUserController);
    this.router.post("/login", this.user.loginController);
    this.router.patch("/users/:userId", this.user.updateUserController);
    this.router.delete("/users/:delete-userId", this.user.deleteUserController);
  }
}
