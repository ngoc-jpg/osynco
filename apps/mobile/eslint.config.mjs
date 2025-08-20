import baseConfig from "@osynco/eslint-config/base"
import reactConfig from "@osynco/eslint-config/react"

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: [".expo/**", "expo-plugins/**"]
    },
    ...baseConfig,
    ...reactConfig
]
