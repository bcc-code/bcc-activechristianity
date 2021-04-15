const path = require("path")

module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],
    "moduleNameMapper": {
        "@/(.*)$": "<rootDir>/src/$1",
        '^.+\\.(css|less)$': '<rootDir>/jest-configs/__mocks__/CSSStub.js'
      },
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.tsx?$": "ts-jest",
/*       "\\.svg": "<rootDir>/jest-configs/__mocks__/svgTransform.js" , */
      "^.+\\.(tsx?|jsx?)$": `<rootDir>/jest-configs/jest-preprocess.js`,

    },
    testPathIgnorePatterns: [`node_modules`, `.cache`, `public`,`(\\.|/)(data)\\.ts?$`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, `\\.svg`],
    globals: {
        __PATH_PREFIX__: ``,
        'ts-jest': {
            diagnostics: false
          }
      },
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
        path.resolve(__dirname, "./jest-configs/setup-test-env.js")
      ],
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: false,
    coverageReporters: [
        "lcov",
        "text",
        "html"
    ],
    setupFiles:[
      '<rootDir>/jest-configs/__mocks__/loadershim.js',
      '<rootDir>/jest-configs/setEnvVars.js',
      '<rootDir>/jest-configs/__mocks__/setupJest.js',
      //"./setupJest.js"
    ],
    
  };