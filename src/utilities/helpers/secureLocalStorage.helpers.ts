import Encryption from "./encryption.helpers";

export default class SecureLocalStorageHelpers {
    static setItem(key: string, value: string) {
        if (!key.trim()) return;

        return localStorage.setItem(key, Encryption.encrypt(value));
    }

    static getItem(key: string): string {
        if (!key.trim()) return "";

        return Encryption.decript(localStorage.getItem(key) || "");
    }

    static removeItem(key: string) {
        return localStorage.removeItem(key);
    }
}
