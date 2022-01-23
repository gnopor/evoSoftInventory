module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "google"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 4],
        camelcase: ["off"],
        "max-lines-per-function": ["error", 50],
        "max-params": ["error", 3],
        "max-len": [
            "error",
            {
                ignorePattern: "^.*require|export",
                ignoreTemplateLiterals: true,
                code: 100
            }
        ],
        "quote-props": ["error", "as-needed"],
        "comma-dangle": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "require-jsdoc": [
            "error",
            {
                require: {
                    FunctionDeclaration: false,
                    MethodDefinition: false,
                    ClassDeclaration: false,
                    ArrowFunctionExpression: false,
                    FunctionExpression: false
                }
            }
        ]
    }
};
