/**
 *
 */

import type { EnvironmentConfig } from "../types/config"

export const environment = {
    mode: "development",
    baseUrl: {
        development: "https://get-from-devtunnels-cli.devtunnels.ms",
        production: "https://osynco.app"
    }
} satisfies EnvironmentConfig
