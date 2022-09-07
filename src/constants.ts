export const APP_NAME = "Boilerplate";

export const localStorageFields = {
    ACCESS_TOKEN_KEY: `x-${APP_NAME}-access-token`,
    ACCESS_TOKEN_EXPIRATION_KEY: `x-${APP_NAME}-access-token-expiration`,

    DEFAULT_MEMBER_LANGUAGE: `x-${APP_NAME}-default-member-language`
};

// Environment variables configs
export const API_BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URI || "";

export const APP_PUBLIC_URI = process.env.NEXT_PUBLIC_APP_PUBLIC_URI || "";
