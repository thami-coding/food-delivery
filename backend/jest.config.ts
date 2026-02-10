import type { Config } from "jest"
import { createDefaultEsmPreset } from "ts-jest"

const presetConfig = createDefaultEsmPreset({})

export default {
  ...presetConfig,
  testTimeout: 120000,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
} satisfies Config
