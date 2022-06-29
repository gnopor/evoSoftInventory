class TestFactory {
    #testObject;

    constructor() {
        // set default fields here (must be used only in case of Abstract Factory class)
        this.#testObject = {};
    }

    create(options: { [key: string]: any }) {
        // build custom object here and return it
        return { ...this.#testObject, ...options };
    }
}

export default new TestFactory();
