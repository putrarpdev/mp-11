import express, {
  Application,
  Request,
  Response,
  NextFunction
} from "express"
import { IRoutes } from "./interfaces/route.interfaces"


export class App {
  public app: Application;
  public port: number;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = 8000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeErrorMiddlewares() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err.message);
        res.status(500).send(err.message);
      }
    );
  }


  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}