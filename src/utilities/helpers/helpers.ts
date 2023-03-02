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

    static onScreenSizeChange(callback: (size: number) => void) {
        callback(this.getScreenWidth());

        window.addEventListener("resize", () => {
            callback(this.getScreenWidth());
        });
    }

    static getScreenWidth() {
        return window.innerWidth;
    }

    static onConnectionStateChange(callback: (connected: boolean) => void) {
        callback(window.navigator.onLine);

        window.addEventListener("online", () => {
            callback(true);
        });
        window.addEventListener("offline", () => {
            callback(false);
        });
    }

    static delay(ms = 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static formatDate(timestamp: number = 0, { withTime = false } = {}) {
        if (!timestamp) return;

        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = this.formatDateUnit(1 + date.getMonth());
        const day = this.formatDateUnit(date.getDate());

        const hour = this.formatDateUnit(date.getHours());
        const minute = this.formatDateUnit(date.getMinutes());
        const second = this.formatDateUnit(date.getSeconds());

        const dateSection = `${day}/${month}/${year}`;
        const timeSection = withTime ? `${hour}:${minute}:${second}` : "";

        return `${dateSection} ${timeSection}`.trim();
    }

    static parseDateInputValue(numValue: number, options?: { timeOnly?: boolean }) {
        if (!numValue) return;

        const date = new Date(numValue);

        if (options?.timeOnly) {
            const hours = Helpers.formatDateUnit(date.getHours());
            const minutes = Helpers.formatDateUnit(date.getMinutes());

            return `${hours}:${minutes}`;
        }

        const year = date.getFullYear();
        const month = Helpers.formatDateUnit(date.getMonth() + 1);
        const day = Helpers.formatDateUnit(date.getDate());

        return `${year}-${month}-${day}`;
    }

    static formatDateUnit(unit: number | string) {
        return unit.toString().padStart(2, "0");
    }

    static getMap<T extends any[]>(data: T, field = "id") {
        const dataMap: { [key: string]: T[0] } = {};
        for (const item of data) {
            dataMap[item[field]] = item;
        }
        return dataMap;
    }
}
