import Helpers from "../utilities/helpers";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URI;
const SECRET_ENCRIPTION_KEY = process.env.REACT_APP_SECRET_ENCRIPTION_KEY;
// All methods here will be called by the auth context
// and it is the auth context will save user data and session and localStorage data

class AuthService {
  async register(data = {}) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_BASE_URL}/register`, options);
      return this.#handleResponse(response.json());
    } catch (error) {
      this.#handleError(error);
    }
  }

  async activateAccount() {}

  async login() {
    // // encrypt and decrypt data that will go into storage
    // Helpers.encryptData();
    // Helpers.decriptData();
  }

  async logout(userId) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.#getCredential(),
        },
        body: JSON.stringify({ userId }),
      };

      const response = await fetch(`${API_BASE_URL}/logout`, options);
      return this.#handleResponse(response.json());
    } catch (error) {
      this.#handleError(error);
    }
  }

  async initPasswordReset() {}

  async resetPassword() {}

  async refreshToken() {}

  async updatePassword() {}

  async initEmailUpdate() {}

  async updateEmail() {}

  async getUser() {}

  #getCredential() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Missing access token.");
    }

    return `Bearer ${Helpers.decriptData(accessToken, SECRET_ENCRIPTION_KEY)}`;
  }

  #handleResponse() {}

  #handleError() {}
}

export default new AuthService();
