export interface Sub {
    [key: string]: string | number | boolean;
}

export interface ReqOptions {
    subs?: Sub;
    method?: string;
    token?: string;
    body?: any;
    raw?: boolean;
}