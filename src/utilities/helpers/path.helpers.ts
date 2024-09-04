export default class PathHelpers {
    // -----------------------------
    static error404Path() {
        return "/404/";
    }
    static homePagePath() {
        return "/";
    }
    static inventoryDetailPagePath(productId: string) {
        return productId ? `/inventory?id=${productId}` : "";
    }
}
