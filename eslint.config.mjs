import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@next/next/recommended",
    "prettier",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-empty-object-type": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        "prettier/prettier": ["warn", {
            printWidth: 100,
            tabWidth: 4,
            singleQuote: true,
            trailingComma: "all",
            bracketSpacing: true,
            semi: true,
            useTabs: false,
            bracketSameLine: false,
            jsxSingleQuote: false,
            arrowParens: "always",
            embeddedLanguageFormatting: "auto",
            htmlWhitespaceSensitivity: "css",
            insertPragma: false,
            proseWrap: "preserve",
            quoteProps: "as-needed",
            requirePragma: false,
            plugins: ["prettier-plugin-tailwindcss"],
        }],
    },
}];