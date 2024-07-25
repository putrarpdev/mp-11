export type Event = {
    title: string;
    date: string;
    description: string;
    price: number;
    category_id: number;
    location_id: number;
    available_seats: number;
}

declare global {
    namespace Express {
        export interface Request {
            event?: Event;
        }
    }
}