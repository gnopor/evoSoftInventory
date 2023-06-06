import { API_BASE_URI, localStorageFields } from "../constants";
import Helpers from "../utilities/helpers/helpers";
import SecureLocalStorage from "../utilities/helpers/secureLocalStorage.helpers";

const API_BASE_URL = API_BASE_URI;
const API_SERVICE = "auth";
const API_VERSION = "v1";
const BASE_URL = `${API_BASE_URL}/${API_SERVICE}/${API_VERSION}`;

const ACCESS_TOKEN_KEY = localStorageFields.ACCESS_TOKEN_KEY;
const ACCESS_TOKEN_EXPIRATION_KEY = localStorageFields.ACCESS_TOKEN_EXPIRATION_KEY;

const defaultErrorMessage = `An error occurred while processing your ${API_SERVICE} request.`;

interface IAuthCredential {
    user: I.IUser;
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    #parseFetchResponse<T = any>(fetchResponse: Response) {
        return Helpers.parseFetchResponse<T>(fetchResponse, defaultErrorMessage);
    }

    async register(data: { email: string; password: string }) {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/register`, options);
        return this.#parseFetchResponse(response);
    }

    async activateAccount(data: { token: string }) {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/account-activation`, options);
        return this.#parseFetchResponse(response);
    }

    async login(data: { email: string; password: string }) {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        };

        const fetchResponse: any = await fetch(`${BASE_URL}/login`, options);
        const response = await this.#parseFetchResponse<IAuthCredential>(fetchResponse);

        saveAuthToken(response.accessToken);
        return response;
    }

    async logout(data: { userId: string }) {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify(data)
        };

        const fetchResponse = await fetch(`${BASE_URL}/logout`, options);
        const response = await this.#parseFetchResponse(fetchResponse);

        deleteAuthToken();
        return response;
    }

    async initPasswordReset(data: { email: string }) {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const fetchResponse = await fetch(`${BASE_URL}/users/password/init-reset`, options);
        return this.#parseFetchResponse(fetchResponse);
    }

    async resetPassword(token: string, password: string) {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, password })
        };

        const fetchResponse = await fetch(`${BASE_URL}/users/password/reset`, options);
        return this.#parseFetchResponse(fetchResponse);
    }

    async refreshToken() {
        try {
            const options: RequestInit = {
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            };

            const fetchResponse = await fetch(`${BASE_URL}/refresh-token`, options);
            const response = await this.#parseFetchResponse<IAuthCredential>(fetchResponse);

            saveAuthToken(response.accessToken);
            return response;
        } catch (error) {
            deleteAuthToken();
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const options: RequestInit = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.getCredential()
                }
            };

            const fetchResponse = await fetch(`${BASE_URL}/users/current`, options);
            const response = await this.#parseFetchResponse<I.IUser>(fetchResponse);
            return response;
        } catch (error) {
            deleteAuthToken();
            throw error;
        }
    }

    async updatePassword(oldPassword: string, password: string) {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify({ oldPassword, password })
        };

        const fetchResponse = await fetch(`${BASE_URL}/users/password`, options);
        this.#parseFetchResponse(fetchResponse);

        deleteAuthToken();
    }

    async initEmailUpdate(email: string) {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify({ email })
        };

        const fetchResponse = await fetch(`${BASE_URL}/users/email/init`, options);
        return this.#parseFetchResponse(fetchResponse);
    }

    async updateEmail(emailValidationToken: string) {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify({ token: emailValidationToken })
        };

        const fetchResponse = await fetch(`${BASE_URL}/users/email`, options);
        return this.#parseFetchResponse(fetchResponse);
    }

    async getUser(idUser: string) {
        const fetchResponse = await fetch(`${BASE_URL}/users/${idUser}`);
        return this.#parseFetchResponse<I.IUser>(fetchResponse);
    }

    async updateUser(data: I.IUser) {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify({ data })
        };

        const fetchResponse = await fetch(`${BASE_URL}/users/${data.id}`, options);
        return this.#parseFetchResponse<I.IUser>(fetchResponse);
    }

    getCredential() {
        const accessToken = SecureLocalStorage.getItem(ACCESS_TOKEN_KEY);

        return accessToken ? `Bearer ${accessToken}` : "";
    }

    isUserAuthenticated() {
        const accessToken = SecureLocalStorage.getItem(ACCESS_TOKEN_KEY);
        const tokenExpiration = SecureLocalStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY) || 0;
        return (accessToken && +tokenExpiration > Date.now()) as boolean;
    }
}

// -----------
function saveAuthToken(accessToken: string) {
    SecureLocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    SecureLocalStorage.setItem(
        ACCESS_TOKEN_EXPIRATION_KEY,
        String(Date.now() + 24 * 60 * 60 * 1000)
    );
}

function deleteAuthToken() {
    SecureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
    SecureLocalStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY);
}

// ------------
export default new AuthService();
