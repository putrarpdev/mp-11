export type Transactions = {
    event_id: number;
    total_tickets_sold: number;
    total_revenue: number;
    transaction_date: Date;
    promotion_id: number;
    amount: number;
    points_redeemed: number;
    discount_percentage: number;
    max_uses: number;
    used_count: number;
    start_date: Date;
    end_date: Date;
    uses_referral: Boolean;
    uses_event_date: Boolean;
}

declare global {
    namespace Express {
        export interface Request {
            transactions?: Transactions;
        }
    }
}