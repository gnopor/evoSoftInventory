import { AES, enc } from "crypto-js";

import fingerprintHelpers from "./fingerprint.helpers";

const SECRET_ENCRIPTION_KEY = fingerprintHelpers.getFingerprint();

export default class EncryptionHelpers {
    static encrypt(plainText: string, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.encrypt(plainText, secretKey).toString();
    }

    static decript(cipherText: string, secretKey = SECRET_ENCRIPTION_KEY) {
        try {
            return AES.decrypt(cipherText, secretKey).toString(enc.Utf8);
        } catch (error) {
            console.error(error);
            return "";
        }
    }
}
