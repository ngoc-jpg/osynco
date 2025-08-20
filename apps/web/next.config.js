import { fileURLToPath } from "url"
import createJiti from "jiti"

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env")

/** @type {import("next").NextConfig} */
const config = {
    /** Enables hot reloading for local packages without a build step */
    transpilePackages: ["@osynco/api", "@osynco/auth", "@osynco/db", "@osynco/ui", "@osynco/validators"],

    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    /** May need to add a development base URL here. */
    allowedDevOrigins: []
}

export default config
