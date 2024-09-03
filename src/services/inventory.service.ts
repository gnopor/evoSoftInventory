import allProdutcs from "../../public/json/products.json";
import allShops from "../../public/json/shops.json";
import { localStorageFields } from "../constants";
import SecureLocalStorage from "../utilities/helpers/secureLocalStorage.helpers";

export default class InventoryService {
    static getShops(): I.IMagasin[] {
        return allShops;
    }

    static getProducts(): I.IProduit[] {
        return allProdutcs;
    }

    static getInventories(): I.IInventaire[] {
        const result = SecureLocalStorage.getItem(localStorageFields.INVENTORY_LIST);
        return JSON.parse(result || "[]");
    }

    static saveInventories(data: I.IInventaire[]) {
        SecureLocalStorage.setItem(localStorageFields.INVENTORY_LIST, JSON.stringify(data));
    }
}
