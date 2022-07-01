import Encryption from "./encryption.helpers";

export default class LocalStorageHelpers {
    static setItem(key: string, value: string) {
        return localStorage.setItem(key, Encryption.encrypt(value));
    }

    static getItem(key: string) {
        return Encryption.decript(localStorage.getItem(key) || "") || "";
    }

    static removeItem(key: string) {
        return localStorage.removeItem(key);
    }
}
