import allLanguages from "../../public/json/languages.json";
import allLabels from "../../public/json/labels.json";

class UIService {
    async getLanguages() {
        return allLanguages;
    }

    async getLabel(language: I.ILanguage) {
        return allLabels.find((labels) => labels.languageCode2 === language.code2);
    }
}

export default new UIService();

/*
import { API_BASE_URI } from "../constants";
import Helpers from "../utilities/helpers/helpers";

const API_BASE_URL = API_BASE_URI;
const API_SERVICE = "language";
const API_VERSION = "v1";
const BASE_URL = `${API_BASE_URL}/${API_SERVICE}/${API_VERSION}`;

const defaultErrorMessage = `An error occurred while processing your ${API_SERVICE} request.`;

class UIService {
    #parseFetchResponse<T = any>(fetchResponse: Response) {
        return Helpers.parseFetchResponse<T>(fetchResponse, defaultErrorMessage);
    }

    async getLanguages() {
        const fetchResponse = await fetch(`${BASE_URL}/languages`);
        return this.#parseFetchResponse<I.ILanguage[]>(fetchResponse);
    }

    async getLabel(language: I.ILanguage) {
        const fetchResponse = await fetch(`${BASE_URL}/labels`);
        const response = await this.#parseFetchResponse<I.ILabel[]>(fetchResponse);
        return response.find((labels) => labels.languageCode2 === language.code2);
    }
}

export default new UIService();
*/
