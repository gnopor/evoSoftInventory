type IFormValues = Record<string, any>;

export default class ValidationHelpers {
    // static #isPhoneNumberValid(number: string) {
    //     return isValidPhoneNumber(number);
    // }
    // static #isEmailValid(email: string) {
    //     return typeof email == "string"
    //         ? email.trim().match(/^\b[A-Za-z0-9_]+@[A-Za-z0-9_]+\.[A-Za-z0-9]+$/g)
    //         : false;
    // }
    // // auth ----------
    // static isRegisterFormValid<T extends IFormValues>(formValues: T, labels: any) {
    // const data: IFormValues = { ...formValues };
    //     const fields = [
    //         "firstName",
    //         "lastName",
    //         "email",
    //         "phoneNumber",
    //         "password",
    //         "confirmPassword"
    //     ];
    //     fields.forEach((field) => (data[field] = data[field]?.trim()));
    //     const { email, phoneNumber, password, confirmPassword } = data;
    //     return new Promise<T>((resolve, reject) => {
    //         for (const field of fields) {
    //             !data[field] && reject(new Error(labels?.mainForm[field]?.errorMessage));
    //         }
    //         if (!this.#isPhoneNumberValid(phoneNumber)) {
    //             reject(new Error(labels?.mainForm?.phoneNumber?.errorMessage));
    //         }
    //         if (!this.#isEmailValid(email)) {
    //             reject(new Error(labels?.mainForm?.email?.errorMessage));
    //         }
    //         if (isNaN(password) || password.toString().length != 8) {
    //             reject(new Error(labels?.mainForm?.password?.errorMessage));
    //         }
    //         if (password !== confirmPassword) {
    //             reject(new Error(labels?.mainForm?.confirmPassword?.errorMessage));
    //         }
    //         resolve(data as T);
    //     });
    // }
    // static isIdentifierValid<T extends IFormValues>(formValues: T, labels: any) {
    // const data: IFormValues = { ...formValues };
    //     const { identifier } = data;
    //     return new Promise<T>((resolve, reject) => {
    //         !(String(identifier).length === 8 && !isNaN(identifier)) &&
    //             reject(new Error(labels?.identifierForm?.identifier?.errorMessage));
    //         resolve(data as T);
    //     });
    // }
    // static isPasswordValid<T extends IFormValues>(formValues: T, labels: any) {
    // const data: IFormValues = { ...formValues };
    //     const { password } = data;
    //     return new Promise<T>((resolve, reject) => {
    //         !(String(password).length === 8 && !isNaN(password)) &&
    //             reject(new Error(labels?.passwordForm?.password?.errorMessage));
    //         resolve(data as T);
    //     });
    // }
    // static isForgotIdentifierFormValid<T extends IFormValues>(formValues: T, labels: any) {
    // const data: IFormValues = { ...formValues };
    //     data.email = data.email.trim();
    //     const { email } = data;
    //     return new Promise<T>((resolve, reject) => {
    //         if (!this.#isEmailValid(email)) {
    //             reject(new Error(labels?.mainForm?.email?.errorMessage || ""));
    //         }
    //         resolve(data as T);
    //     });
    // }
    // static isForgotPasswordFormValid<T extends IFormValues>(formValues: T, labels: any) {
    // const data: IFormValues = { ...formValues };
    //     data.identifier = String(data.identifier).trim();
    //     const { identifier } = data;
    //     return new Promise<T>((resolve, reject) => {
    //         (String(identifier).length === 8 && !isNaN(identifier)) ||
    //             reject(new Error(labels?.mainForm?.identifier?.errorMessage || ""));
    //         resolve(data as T);
    //     });
    // }
    // static isUserFormValid<T extends I.IUser>(formValues: T, labels: any) {
    //     const data: { [key: string]: any } = { ...formValues };
    //     const fields = [
    //         "firstName",
    //         "lastName",
    //         "email",
    //         "phoneNumber",
    //         "password",
    //         "language",
    //         "currencyCode"
    //     ];
    //     fields.forEach((field) => (data[field] = data[field]?.trim()));
    //     const { email, phoneNumber } = data;
    //     return new Promise<T>((resolve, reject) => {
    //         for (const field of fields) {
    //             !data[field] && reject(new Error(labels?.mainForm[field]?.errorMessage));
    //         }
    //         if (!this.#isPhoneNumberValid(phoneNumber)) {
    //             reject(new Error(labels?.mainForm?.phoneNumber?.errorMessage));
    //         }
    //         if (!this.#isEmailValid(email)) {
    //             reject(new Error(labels?.mainForm?.email?.errorMessage));
    //         }
    //         resolve(data as T);
    //     });
    // }
}
