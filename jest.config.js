/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'jsdom',
    'setupFilesAfterEnv': [
        '<rootDir>/setup-test.ts'
    ],
    'moduleNameMapper': {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@api/(.*)$": "<rootDir>/src/api/$1",
        "^@hook/(.*)$": "<rootDir>/src/hook/$1",
        "^@theme/(.*)$": "<rootDir>/src/theme/$1",
        "^@redux/(.*)$": "<rootDir>/src/redux/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1"
    },
    'collectCoverageFrom': [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.{spec,test}.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/dist/**',
        '!**/build/**',
        '!vite.config.ts',
        '!**/coverage/**'
    ],
    'coveragePathIgnorePatterns': [
        '/node_modules/',
        'setup-tests.ts',
        'vite-env.d.ts'
    ],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: 'tsconfig.app.json',
            },
        ],
    },
};