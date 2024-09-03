export default class PathHelpers {
    // -----------------------------
    static error404Path() {
        return "/404/";
    }
    static homePagePath() {
        return "/";
    }
    static shopDetailPagePath(shopId: string) {
        return shopId ? `/shop?id=${shopId}` : "";
    }
}
