import { AES, enc } from "crypto-js";

const SECRET_ENCRIPTION_KEY = process.env.NEXT_PUBLIC_SECRET_ENCRIPTION_KEY;

export default class EncryptionHelpers {
    static encrypt(plainText: string, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.encrypt(plainText, secretKey as string).toString();
    }
    static decript(cipherText: string, secretKey = SECRET_ENCRIPTION_KEY) {
        return AES.decrypt(cipherText, secretKey as string).toString(enc.Utf8);
    }
}
