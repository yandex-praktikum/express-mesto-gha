module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error, single"],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "eol-last": 0,
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "linebreak-style": 0,
  },
};
