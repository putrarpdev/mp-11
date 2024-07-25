export interface Event {
    id?: number;
    title: string;
    category_id: number;
    location_id: number;
    is_deleted: Boolean;
    created_at?: Date;
    update_at?: Date;
}