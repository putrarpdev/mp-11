import express, { Router } from 'express';
import { DashboardController } from '@/controllers/dashboard.controller';
import { IRoutes } from '@/interfaces/route.interfaces';

export class DashboardRouter implements IRoutes {
    public router: Router = Router()
    private dashboard = new DashboardController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/events/:organizeId', this.dashboard.getOrganizerEvents);
        this.router.get('/registrations/:eventId', this.dashboard.getEventRegistrations);
        this.router.get('transactions/:eventId', this.dashboard.getEventTransactions);
        this.router.get('statistics/:eventId', this.dashboard.getEventStatistics);
        this.router.get('/dashboardData', this.dashboard.getDashboardData);
        // this.router.get('/dashboardData', this.dashboard.getEventCategoryCount);
    }
}