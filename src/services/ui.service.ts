import { API_BASE_URI } from "../constants";
import Helpers from "../utilities/helpers/helpers";
// import allLanguages from "../../public/assets/json/languages.json";

const API_BASE_URL = API_BASE_URI;
const API_SERVICE = "language";
const BASE_URL = `${API_BASE_URL}/${API_SERVICE}`;

const defaultErrorMessage = `An error occurred while processing your ${API_SERVICE} request.`;

class UIService {
    #parseFetchResponse<T = any>(fetchResponse: Response) {
        return Helpers.parseFetchResponse<T>(fetchResponse, defaultErrorMessage);
    }

    async getLanguages() {
        const fetchResponse = await fetch(`${BASE_URL}/get-languages`);

        return this.#parseFetchResponse<I.ILanguage[]>(fetchResponse);
    }

    // async getLanguages() {
    //     return allLanguages;
    // }

    async getLabel(language: I.ILanguage) {
        const fetchResponse = await fetch("/json/labels.json");
        const response = await this.#parseFetchResponse<I.ILabel[]>(fetchResponse);

        return response.find((labels) => labels.languageCode2 === language.code2);
    }
}

export default new UIService();
