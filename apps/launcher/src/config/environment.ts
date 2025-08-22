/**
 *
 */

import type { EnvironmentConfig } from "../types/config"

export const environment = {
    mode: "development",
    baseUrl: {
        development: "https://7wbhc8w7-6462.usw2.devtunnels.ms",
        production: "https://osynco.com"
    }
} satisfies EnvironmentConfig
