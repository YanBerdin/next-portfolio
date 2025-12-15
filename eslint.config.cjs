module.exports = [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    // load plugin module so its rules are available in flat config
    plugins: {
      "react-hooks": require("eslint-plugin-react-hooks")
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      "react-hooks/exhaustive-deps": "error"
    },
  },
]
module.exports = [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false,
        },
      ],
    },
  },
]
const { FlatCompat } = require("@eslint/eslintrc")
const compat = new FlatCompat({})

module.exports = [
  // reuse legacy configs via FlatCompat
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"
  ),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules/**", ".next/**"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
      }
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false
        }
      ],
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_"
        }
      ]
    }
  }
]
