import baseConfig, { restrictEnvAccess } from "@osynco/eslint-config/base"

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: []
    },
    ...baseConfig,
    ...restrictEnvAccess
]
