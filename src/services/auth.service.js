import Helpers from "../utilities/helpers";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URI;

class AuthService {
    async register(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/register`, options);
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

        const response = await fetch(`${API_BASE_URL}/account-activation`, options);
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

        const response = await fetch(`${API_BASE_URL}/login`, options);
        return await this.#parseResponse(response);
    }

    async logout(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/logout`, options);
        return await this.#parseResponse(response);
    }

    async initPasswordReset(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/init-password-reset`, options);
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

        const response = await fetch(`${API_BASE_URL}/reset-password`, options);
        return await this.#parseResponse(response);
    }

    async refreshToken() {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#getCredential(),
            },
        };

        const response = await fetch(`${API_BASE_URL}/refresh-token`, options);
        return await this.#parseResponse(response);
    }

    async updatePassword(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/update-password`, options);
        return await this.#parseResponse(response);
    }

    async initEmailUpdate(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/init-email-update`, options);
        return await this.#parseResponse(response);
    }

    async updateEmail(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/update-email`, options);
        return await this.#parseResponse(response);
    }

    async getUser(data) {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#getCredential(),
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_BASE_URL}/reset-password`, options);
        return await this.#parseResponse(response);
    }

    #getCredential() {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("Missing access token.");
        }
        return `Bearer ${Helpers.decriptData(accessToken)}`;
    }

    #parseResponse(response) {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    }
}

export default new AuthService();
