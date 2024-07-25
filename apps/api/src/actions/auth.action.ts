import prisma from "@/prisma";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

class AuthAction {
    public async login(email: string, password_hash: string) {
        try {
            const user = await prisma.users.findFirst({
                select: {
                    username: true,
                    email: true,
                    firstname: true,
                    lastname: true,
                    password_hash: true,
                    user_roles: {
                        select: {
                            role_id: true,
                        },
                    },
                },
                where: {
                    email,
                },
            });

            if (!user) throw new Error("Email or Password is incorrect");

            const isValid = await compare(password_hash, user.password_hash);

            if (!isValid) throw new Error("Password is incorrect");

            const payload = {
                email: user.email,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role_id: user.user_roles,
            };

            const token = sign(payload, String(process.env.API_KEY), {
                expiresIn: "1hr",
            });

            return token;
        } catch (err) {
            throw err;
        };
    };

    public async findUserByEmail(email: string) {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email,
                },
            });

            return user;
        } catch (err) {
            throw err;
        }
    }

    public async findUserById(id: number) {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id,
                },
            });

            return user;
        } catch (err) {
            throw err;
        }
    }

    public async findUserByEmailOrUsername(email: string, username: string) {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
            });

            return user;
        } catch (err) {
            throw err;
        }
    };

    public async createUser(
        username: string,
        email: string,
        password_hash: string,
        firstname: string,
        lastname: string
    ) {
        try {
            const check = await this.findUserByEmailOrUsername(email, username);

            if (check) throw new Error("Email or Username already exist");

            const salt = await genSalt(10);
            const hassPass = await hash(password_hash, salt);

            const user = await prisma.users.create({
                data: {
                    username,
                    email,
                    password_hash: hassPass,
                    firstname,
                    lastname
                },
            })

            return user;
        } catch (err) {
            throw err;
        }
    }
}

export default new AuthAction();