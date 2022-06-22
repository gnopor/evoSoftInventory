class TestFactory {
    #testObject;

    constructor() {
        // set default field here
        this.#testObject = {};
    }

    create(options: { [key: string]: any }) {
        // build custom object here and return it
        return { ...this.#testObject, ...options };
    }
}

export default new TestFactory();
