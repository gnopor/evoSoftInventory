import { AES, enc } from "crypto-js";

import fingerprintHelpers from "./fingerprint.helpers";

const SECRET_ENCRIPTION_KEY = fingerprintHelpers.getFingerprint();

export default class EncryptionHelpers {
    static encrypt(plainText: string, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.encrypt(JSON.stringify(plainText), secretKey).toString();
    }

    static decript(cipherText: string, secretKey = SECRET_ENCRIPTION_KEY) {
        try {
            if (!cipherText.trim()) return "";

            const plainText = AES.decrypt(cipherText, secretKey).toString(enc.Utf8);
            if (!plainText) return "";

            return JSON.parse(plainText);
        } catch (error) {
            console.error(error);
        }
    }
}
