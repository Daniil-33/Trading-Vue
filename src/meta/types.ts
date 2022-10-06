export type ChartDataEl = [
    number, // timestamp
    number, // open
    number, // high
    number, // low
    number, // close
    number, // volume
];

export type APIDataEl = {
    id: number,
    open: number,
    close: number,
    low: number,
    high: number,
    amount: number,
    vol: number,
    count: number,
};

export type APIResponse = {
    status: string,
    ts: number,
    data: APIDataEl[],
    ch?: string,
    'err-code'?: string,
    'err-msg'?: string
};

export type Signal = {
    price: number,
    signal_status: number,
    signal_type: string,
    timestamp: number
};

export type Order = {
    amount: number,
    commission: number,
    dust: boolean,
    open_at: string,
    open_type: number,
    order_id: string,
    original_quantity: number,
    price: number,
    profit: number,
    quantity: number,
    symbol: string,
    trading_history: Array<any>,
    use_in_calc_amount_sum: boolean,
    work_balance: number
}