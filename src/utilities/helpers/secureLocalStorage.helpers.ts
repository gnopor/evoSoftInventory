import Encryption from "./encryption.helpers";

export default class SecureLocalStorageHelpers {
    static setItem(key: string, value: string) {
        if (!(key.length > 0 && value.length > 0)) {
            throw new Error("key and value must be non empty strings.");
        }

        return localStorage.setItem(key, Encryption.encrypt(value));
    }

    static getItem(key: string) {
        if (!(key.length > 0)) {
            throw new Error("key must be a non empty string.");
        }

        return Encryption.decript(localStorage.getItem(key) || "");
    }

    static removeItem(key: string) {
        return localStorage.removeItem(key);
    }
}
