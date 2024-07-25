export type User = {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    user_roles: number;
    referral_code: string;
    user_id: number;
};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}

