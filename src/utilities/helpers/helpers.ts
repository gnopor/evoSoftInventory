/**
 *  You should regularly refactor this file and move functions
 *  that have outgrown the file into their own proper modules(services),
 *  otherwise there's a tendency that you'll just leave the functions
 *  there growing related functions without ever graduating into a proper module.
 */

import { customAlphabet } from "nanoid";

export default class Helpers {
    static async parseFetchResponse<T = any>(response: Response, defaultErrorMessage = "") {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.message || defaultErrorMessage);
        }

        return response.json() as Promise<T>;
    }

    static createId() {
        const nanoid = customAlphabet(
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            24
        );

        return nanoid();
    }

    static delay(ms = 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
