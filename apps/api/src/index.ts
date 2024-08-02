import { App } from './app';
import { EventRouter } from './routers/event.router';
import { UserRouter } from './routers/user.router';
import { DashboardRouter } from './routers/dashboard.route';

const app = new App([ new UserRouter(), new EventRouter(), new DashboardRouter() ]);

app.listen();
