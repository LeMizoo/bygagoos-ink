import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"]
        },
        ecmaVersion: "latest",
        sourceType: "module"
      },

      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        Image: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        navigator: "readonly",
        Intl: "readonly"
      }
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // warnings sur les variables non utilisées
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^React$"
        }
      ],
      "no-undef": "error",

      // options supplémentaires pour JSX
      "jsx-a11y/no-noninteractive-element-interactions": "off"
    }
  },

  // Spécifique pour les anciens fichiers / backups : tout ignorer
  {
    files: ["src/archive/**", "src/temp_backup/**"],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];
