export default class InventoryFactory {
    static create<T extends I.IInventaire>(initial?: T) {
        const newInventory: I.IInventaire = {
            produitId: initial?.produitId || "",
            date: initial?.date || "",
            stock: initial?.stock || {}
        };

        return newInventory;
    }
}
