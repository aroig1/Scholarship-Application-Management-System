/** @type { import("eslint").Linter.Config } */
module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:svelte/recommended", "prettier"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        extraFileExtensions: [".svelte"]
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    },
    overrides: [
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
            parserOptions: {
                parser: {
                    // Specify a parser for each lang.
                    ts: "@typescript-eslint/parser",
                    js: "espree",
                    typescript: "@typescript-eslint/parser"
                }
            }
        }
        // ...
    ]
};
