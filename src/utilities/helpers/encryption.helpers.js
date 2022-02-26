import { AES, enc } from "crypto-js";

const SECRET_ENCRIPTION_KEY = process.env.NEXT_PUBLIC_SECRET_ENCRIPTION_KEY;

export default class Encryption {
    static encrypt(plainText, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.encrypt(plainText, secretKey).toString();
    }
    static decript(cipherText, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.decrypt(cipherText, secretKey).toString(enc.Utf8);
    }
}
