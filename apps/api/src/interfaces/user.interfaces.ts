export interface User {
    id?: number;
    username: string;
    email: string;
    password_hash: string;
    is_deleted: Boolean;
    created_at?: Date;
    updated_at?: Date;
}