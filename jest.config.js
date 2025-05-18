/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts"],
  moduleFileExtensions: ["ts", "js"],
  modulePathIgnorePatterns: ["utils"],
};
