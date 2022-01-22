/**
 *  You should regularly refactor this file and move functions
 *  that have outgrown the file into their own proper modules(services),
 *  otherwise there's a tendency that you'll just leave the functions
 *  there growing related functions without ever graduating into a proper module.
 */

import { customAlphabet } from "nanoid";
import { AES, enc } from "crypto-js";

const SECRET_ENCRIPTION_KEY = process.env.REACT_APP_SECRET_ENCRIPTION_KEY;

export default class Helpers {
    static createId() {
        const nanoid = customAlphabet(
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            24
        );

        return nanoid();
    }

    static encryptData(plainText, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.encrypt(plainText.toString(), secretKey).toString();
    }

    static decriptData(cipherText, secretKey = SECRET_ENCRIPTION_KEY) {
        return cipherText ? AES.decrypt(cipherText, secretKey).toString(enc.Utf8) : null;
    }
}
