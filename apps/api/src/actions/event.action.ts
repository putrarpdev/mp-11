import prisma from "@/prisma";

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

    public async findEventByTitle(title: string) {
        try {
            const user = await prisma.events.findMany({
                where: {
                    title,
                },
            });

            return user;
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