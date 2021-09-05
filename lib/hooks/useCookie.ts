/* eslint-disable no-unused-vars */
import Cookie from 'universal-cookie';
import { CookieParseOptions } from 'universal-cookie/cjs/types';


const getOptions = (host: string) => (options: CookieParseOptions) => ({
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    domain: host,
    ...options,
});

export interface ICookie {
    get(name: string, options?: CookieParseOptions): string
    set(name: string, value: string, options?: CookieParseOptions): void
    remove(name: string, options?: CookieParseOptions): void
}

class Cookies implements ICookie {
    cookies: Cookie;

    getOpts: (options: {}) => {
        decode: (value: string) => string;
        path: string;
        maxAge: number;
        domain: string
    };

    constructor(ctx: string | object | null, host: string) {
        this.cookies = new Cookie(ctx);
        // @ts-ignore
        this.getOpts = getOptions(host);
    }

    // @ts-ignore
    get = (name: string, options = {}) => this.cookies.get(name, this.getOpts(options))

    set = (name: string,
        value: string,
        options = {}) => this.cookies.set(name, value, this.getOpts(options))

    // @ts-ignore
    remove = (name: string, options: string) => this.cookies.remove(name, this.getOpts(options))
}

export const useCookie = (cookie: string | null, host: string) => new Cookies(cookie, host);


