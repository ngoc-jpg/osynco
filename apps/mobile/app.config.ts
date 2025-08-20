/**
 *
 */

import type { ConfigContext, ExpoConfig } from "expo/config"

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "OSYNCO",
    slug: "osynco",
    scheme: "osynco",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon-512.png",
    userInterfaceStyle: "automatic",
    updates: { fallbackToCacheTimeout: 0 },
    assetBundlePatterns: ["**/*"],
    ios: {
        bundleIdentifier: "com.ngoc-jpg.osynco",
        // supportsTablet: true,
        icon: {
            light: "./assets/icon.png"
            // dark: "./assets/icon.png"
            // tinted: "",
        }
    },
    android: {
        package: "com.ngoc-jpg.osynco",
        adaptiveIcon: {
            foregroundImage: "./assets/icon.png",
            backgroundColor: "#FFFFFF"
        }
    },
    // extra: {
    //     eas: {
    //         projectId: "your-eas-project-id"
    //     }
    // },
    experiments: {
        tsconfigPaths: true,
        typedRoutes: true
    },
    plugins: [
        "expo-router",
        "expo-asset",
        "expo-secure-store",
        "expo-web-browser",
        [
            "expo-splash-screen",
            {
                backgroundColor: "#FFFFFF",
                // image: "./assets/icon.png",
                dark: {
                    backgroundColor: "#FFFFFF"
                    // image: "./assets/icon.png"
                }
            }
        ]
    ],
    newArchEnabled: true
})
