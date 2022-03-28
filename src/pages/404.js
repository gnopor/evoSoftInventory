export default function Error404Page() {
    if (process.browser) {
        window.open("/home", "_self");
    }

    return "";
}
