module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular"
  },
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["ts", "js", "html", "scss"],
};




