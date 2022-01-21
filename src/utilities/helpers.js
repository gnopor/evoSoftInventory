/**
 *  You should regularly refactor this file and move functions
 *  that have outgrown the file into their own proper modules(services),
 *  otherwise there's a tendency that you'll just leave the functions
 *  there growing related functions without ever graduating into a proper module.
 */

import { customAlphabet } from "nanoid";
import { AES, enc } from "crypto-js";

export default class Helpers {
  static createId() {
    const nanoid = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      12
    );

    return nanoid();
  }

  static encryptData(plainText, secretKey) {
    return AES.encrypt(plainText, secretKey).toString();
  }

  static decriptData(cipherText, secretKey) {
    return AES.decrypt(cipherText, secretKey).toString(enc.Utf8);
  }
}
