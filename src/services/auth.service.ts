import { APP_NAME } from "../utilities/contstants";
import LocalStorage from "../utilities/helpers/localStorage.helpers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI;
const API_SERVICE_NAME = "auth";
const BASE_URL = `${API_BASE_URL}/${API_SERVICE_NAME}`;

const ACCESS_TOKEN_KEY = `x-${APP_NAME}-access-token`;
const ACCESS_TOKEN_EXPIRATION_KEY = `x-${APP_NAME}-access-token-expiration`;

class AuthService {
    async register(data: { email: string; password: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/register`, options);
        return await this.#parseResponse(response);
    }

    async activateAccount(data: { token: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/account-activation`, options);
        return await this.#parseResponse(response);
    }

    async login(data: { email: string; password: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        let response: any = await fetch(`${BASE_URL}/login`, options);
        response = await this.#parseResponse(response);

        saveAuthToken(response.accessToken);
        return response;
    }

    async logout(data: { userId: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify(data)
        };

        let response = await fetch(`${BASE_URL}/logout`, options);
        response = await this.#parseResponse(response);

        deleteAuthToken();
        return response;
    }

    async initPasswordReset(data: { email: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/init-password-reset`, options);
        return await this.#parseResponse(response);
    }

    async resetPassword(data: { email: string; token: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/reset-password`, options);
        return await this.#parseResponse(response);
    }

    async refreshToken() {
        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.getCredential()
                }
            };

            let response: any = await fetch(`${BASE_URL}/refresh-token`, options);
            response = await this.#parseResponse(response);

            saveAuthToken(response.accessToken);
            return response;
        } catch (error) {
            // no mandatory
            deleteAuthToken();
        }
    }

    async updatePassword(data: { userId: string; oldPassword: string; newPassword: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/update-password`, options);
        deleteAuthToken();
        return await this.#parseResponse(response);
    }

    async initEmailUpdate(data: { userId: string; email: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/init-email-update`, options);
        return await this.#parseResponse(response);
    }

    async updateEmail(data: { token: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/update-email`, options);
        return await this.#parseResponse(response);
    }

    async getUser(userId: string) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify({ userId })
        };

        const response = await fetch(`${BASE_URL}/reset-password`, options);
        return await this.#parseResponse<I.IUser>(response);
    }

    async #parseResponse<T>(response: Response) {
        // if (!response.ok && response.status === "401") {
        //     return this.refreshToken();
        // }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.message || "Default error message");
        }

        return response.json() as Promise<T>;
    }

    getCredential() {
        const accessToken = LocalStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
            throw new Error("Missing access token.");
        }
        return `Bearer ${accessToken}`;
    }

    isUserAuthenticated() {
        const accessToken = LocalStorage.getItem(ACCESS_TOKEN_KEY);
        const tokenExpiration = LocalStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY) || 0;
        return (accessToken && +tokenExpiration > Date.now()) as boolean;
    }
}

function saveAuthToken(accessToken: string) {
    LocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    LocalStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
}

function deleteAuthToken() {
    LocalStorage.removeItem(ACCESS_TOKEN_KEY);
    LocalStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY);
}

export default new AuthService();
