import { API_BASE_URI, APP_NAME } from "../contstants";
import SecureLocalStorage from "../utilities/helpers/secureLocalStorage.helpers";

const API_BASE_URL = API_BASE_URI;
const API_SERVICE_NAME = "auth";
const BASE_URL = `${API_BASE_URL}/${API_SERVICE_NAME}`;

const ACCESS_TOKEN_KEY = `x-${APP_NAME}-access-token`;
const ACCESS_TOKEN_EXPIRATION_KEY = `x-${APP_NAME}-access-token-expiration`;

const defaultErrorMessage = "An error occurred while processing your request";

class AuthService {
    async #parseResponse<T = any>(fetchResponse: Response) {
        if (!fetchResponse.ok) {
            const error = await fetchResponse.json();
            throw new Error(error?.message || defaultErrorMessage);
        }
        return fetchResponse.json() as Promise<T>;
    }

    // -----------------
    async register(data: { email: string; password: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/register`, options);
        return this.#parseResponse(response);
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
        return this.#parseResponse(response);
    }

    async login(data: { email: string; password: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include" as RequestCredentials
        };

        const fetchResponse: any = await fetch(`${BASE_URL}/login`, options);
        const response = await this.#parseResponse<any>(fetchResponse);

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

        const fetchResponse = await fetch(`${BASE_URL}/logout`, options);
        const response = await this.#parseResponse(fetchResponse);

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

        const fetchResponse = await fetch(`${BASE_URL}/init-password-reset`, options);
        return this.#parseResponse(fetchResponse);
    }

    async resetPassword(data: { email: string; token: string }) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const fetchResponse = await fetch(`${BASE_URL}/reset-password`, options);
        return this.#parseResponse(fetchResponse);
    }

    async refreshToken() {
        try {
            const options = {
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include" as RequestCredentials
            };

            const fetchResponse: any = await fetch(`${BASE_URL}/refresh-token`, options);
            const response = await this.#parseResponse<any>(fetchResponse);

            saveAuthToken(response?.accessToken);
            return response;
        } catch (error) {
            deleteAuthToken();
            throw error;
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

        const fetchResponse = await fetch(`${BASE_URL}/update-password`, options);
        this.#parseResponse(fetchResponse);

        deleteAuthToken();
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

        const fetchResponse = await fetch(`${BASE_URL}/init-email-update`, options);
        return this.#parseResponse(fetchResponse);
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

        const fetchResponse = await fetch(`${BASE_URL}/update-email`, options);
        return this.#parseResponse(fetchResponse);
    }

    async getCurrentUser() {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            }
        };

        const fetchResponse = await fetch(`${BASE_URL}/get-current-user`, options);
        return this.#parseResponse(fetchResponse);
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

        const fetchResponse = await fetch(`${BASE_URL}/reset-password`, options);
        return this.#parseResponse<I.IUser>(fetchResponse);
    }

    async updateUser(memberId: string, data: I.IUser) {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential()
            },
            body: JSON.stringify({ memberId, data })
        };

        const fetchResponse = await fetch(`${BASE_URL}/update-user`, options);
        return this.#parseResponse<I.IUser>(fetchResponse);
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

export default new AuthService();
