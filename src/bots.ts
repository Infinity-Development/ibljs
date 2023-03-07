import { ReqOptions, Sub } from './common';
import { components, paths } from './typings';

export interface BotClientOpts {
    id: string;
    token?: string;
}

type Bot = components["schemas"]["types.Bot"];
type BotStats = components["requestBodies"]["POST_types.BotStatsDocs"]["content"]["application/json"];
type ApiError = components["schemas"]["types.ApiError"];

export class BotClient {
    id: string;
    token?: string;

    constructor (opts: BotClientOpts) {
        this.id = opts.id;
        this.token = opts.token;
    }

    private async request(url: keyof paths, opts: ReqOptions) {
        let fUrl: string = url;

        if(opts.subs) {
            for(const key in opts.subs) {
                fUrl = url.replace(`{${key}}`, opts.subs[key].toString());
            }    
        }

        let reqOpts: RequestInit = {
            method: opts.method || "GET",
        };

        if(opts.token) {
            reqOpts["headers"] = {
                "Authorization": `Bot ${opts.token}`
            };
        }

        if(opts.body) {
            reqOpts["body"] = opts.raw ? opts.body : JSON.stringify(opts.body);
        }

        return fetch(fUrl, reqOpts);
    }

    async getBot(): Promise<Bot> {
        let res = await this.request(`/bots/{id}`, {
            subs: {
                id: this.id
            }
        });

        return await res.json();
    }

    async postBotStats(stats: BotStats): Promise<ApiError> {
        let res = await this.request(`/bots/stats`, {
            token: this.token
        });

        return await res.json();
    }
}
