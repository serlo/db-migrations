import type { Config } from "@jest/types";

const jestConfig: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
};

export default jestConfig;
