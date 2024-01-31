export const APP_NAME = "Boilerplate";

export const LANGUAGE_CODES = ["en", "fr"];
export const DEFAULT_LANGUAGE_CODE = LANGUAGE_CODES[0];

export const localStorageFields = {
    ACCESS_TOKEN_KEY: `x-${APP_NAME}-access-token`,
    ACCESS_TOKEN_EXPIRATION_KEY: `x-${APP_NAME}-access-token-expiration`,

    DEFAULT_USER_LANGUAGE: `x-${APP_NAME}-default-user-language`
};

// Environment variables configs
export const API_BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URI || "";
export const APP_PUBLIC_URI = process.env.NEXT_PUBLIC_APP_PUBLIC_URI || "";

export const SUPPORT_NAME = process.env.NEXT_PUBLIC_SUPPORT_NAME || "";
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";
export const SUPPORT_PHONE_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_PHONE_NUMBER || "";
export const SUPPORT_URL = process.env.NEXT_PUBLIC_SUPPORT_URL || "";
