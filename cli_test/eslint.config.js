import globals from "globals";

export default [
    {
        languageOptions: {
            ecmaVersion: 12,
            globals: {
                ...globals.commonjs,
                ...globals.es2021,
                ...globals.node
            }
        },
        rules: {
            quotes: ['error', 'single'] // 문자열을 작은따옴표로 선언하라 - 규칙
        }
    }
];