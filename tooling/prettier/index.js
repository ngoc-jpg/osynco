import { fileURLToPath } from "node:url"

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
    tailwindConfig: fileURLToPath(new URL("../../tooling/tailwind/web.ts", import.meta.url)),
    tailwindFunctions: ["cn", "cva"],
    importOrder: [
        "<TYPES>",
        "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
        "^(next/(.*)$)|^(next$)",
        "^(expo(.*)$)|^(expo$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "<TYPES>^@osynco",
        "^@osynco/(.*)$",
        "",
        "<TYPES>^[.|..|~]",
        "^~/",
        "^[../]",
        "^[./]"
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "4.4.0",
    overrides: [
        {
            files: "*.json.hbs",
            options: {
                parser: "json"
            }
        },
        {
            files: "*.js.hbs",
            options: {
                parser: "babel"
            }
        }
    ],

    arrowParens: "avoid",
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    jsxSingleQuote: false,
    printWidth: 128,
    semi: false,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "none"
    // tailwindFunctions: ["cn", "ucn", "clsx", "cva"]
}

export default config
