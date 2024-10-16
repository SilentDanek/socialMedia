/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: 'tsconfig.json',  // Укажите путь к вашему tsconfig.json здесь
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],  // Поддержка TS и JS файлов
  testMatch: ['**/*.test.ts'],  // Запуск тестов для файлов .test.ts
};