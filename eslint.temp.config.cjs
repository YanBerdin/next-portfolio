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
