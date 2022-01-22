import Helpers from "../utilities/helpers";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URI;
const API_SERVICE_NAME = "auth";
const BASE_URL = `${API_BASE_URL}/${API_SERVICE_NAME}`;

const ACCESS_TOKEN_KEY = "x-access-token";
const ACCESS_TOKEN_EXPIRATION_KEY = "x-access-token-expiration";

class AuthService {
    async register(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/register`, options);
        return await this.#parseResponse(response);
    }

    async activateAccount(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/account-activation`, options);
        return await this.#parseResponse(response);
    }

    async login(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        let response = await fetch(`${BASE_URL}/login`, options);
        response = await this.#parseResponse(response);

        saveAuthToken(response.accessToken);
        return response;
    }

    async logout(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential(),
            },
            body: JSON.stringify(data),
        };

        let response = await fetch(`${BASE_URL}/logout`, options);
        response = await this.#parseResponse(response);

        deleteAuthToken();
        return response;
    }

    async initPasswordReset(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/init-password-reset`, options);
        return await this.#parseResponse(response);
    }

    async resetPassword(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/reset-password`, options);
        return await this.#parseResponse(response);
    }

    async refreshToken() {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential(),
            },
        };

        let response = await fetch(`${BASE_URL}/refresh-token`, options);
        response = await this.#parseResponse(response);

        saveAuthToken(response.accessToken);
        return response;
    }

    async updatePassword(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/update-password`, options);
        return await this.#parseResponse(response);
    }

    async initEmailUpdate(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/init-email-update`, options);
        return await this.#parseResponse(response);
    }

    async updateEmail(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/update-email`, options);
        return await this.#parseResponse(response);
    }

    async getUser(data) {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: this.getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${BASE_URL}/reset-password`, options);
        return await this.#parseResponse(response);
    }

    #parseResponse(response) {
        // if (!response.ok && response.status === "401") {
        //     return this.refreshToken();
        // }

        if (!response.ok) {
            throw response;
        }

        return response.json();
    }

    getCredential() {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
            throw new Error("Missing access token.");
        }
        return `Bearer ${Helpers.decriptData(accessToken)}`;
    }

    isUserAuthenticated() {
        const accessToken = Helpers.decriptData(localStorage.getItem(ACCESS_TOKEN_KEY));
        const tokenExpiration =
            Helpers.decriptData(localStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY)) || 0;

        return accessToken && +tokenExpiration > Date.now();
    }
}

function saveAuthToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, Helpers.encryptData(accessToken));
    localStorage.setItem(
        ACCESS_TOKEN_EXPIRATION_KEY,
        Helpers.encryptData(Date.now() + 24 * 60 * 60 * 1000)
    );
}

function deleteAuthToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY);
}

export default new AuthService();
