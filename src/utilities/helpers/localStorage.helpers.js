import Encryption from "./encryption.helpers";

export default class LocalStorage {
    static setItem(key, value) {
        if (typeof key === "string" && typeof value === "string") {
            return localStorage.setItem(key, Encryption.encrypt(value));
        }
        throw new Error("key and value must be of type string.");
    }

    static getItem(key) {
        if (typeof key === "string") {
            return Encryption.decript(localStorage.getItem(key) || "") || "";
        }
        throw new Error("key and value must be of type string.");
    }

    static removeItem(key) {
        return localStorage.removeItem(key);
    }
}
