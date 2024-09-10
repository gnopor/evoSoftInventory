import { ERROR_MESSAGE_PREFIX } from "../../constants";

export default class ValidationHelpers {
    static isInventoryFormValid<T extends Record<string, any>>(formValues: T) {
        try {
            const data = { ...formValues };
            const fields = ["date", "produitId"];
            const { stock = {} } = data;

            for (const field of fields) {
                if (!data[field]?.trim()) throw new Error(field);
            }

            for (const value of Object.values(stock) as number[]) {
                if (!(!isNaN(value) && +value >= 0)) throw new Error("stock");
            }

            return data;
        } catch (error: any) {
            throw new Error(ERROR_MESSAGE_PREFIX + error?.message);
        }
    }
}
