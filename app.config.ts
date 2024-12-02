import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "blogapp",
    slug: "blogapp",
    scheme: "blogapp",
    version: "0.1.0",

    newArchEnabled: true,

    orientation: "default",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",

    splash: {
        image: "./assets/images/icon.png",
        resizeMode: "contain",
        backgroundColor: "#1F104A",
    },

    web: {
        bundler: "metro",
        output: "server",
    },

    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],

    ios: {
        bundleIdentifier: "com.detah2.blogapp",
        supportsTablet: true,
    },
    android: {
        package: "com.detah2.blogapp",
        adaptiveIcon: {
            foregroundImage: "./assets/images/icon.png",
            backgroundColor: "#1F104A",
        },
    },

    experiments: {
        tsconfigPaths: true,
        typedRoutes: true,
    },
    plugins: [
        [
            "expo-router"
        ],
        [
            "expo-sqlite",
            {
                enableFTS: true,
                useSQLCipher: true,
                android: {
                    enableFTS: false,
                    useSQLCipher: false
                },
                ios: {
                    customBuildFlags: ["-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"]
                }
            }
        ],
        [
            "expo-camera",
            {
                "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
                "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
                "recordAudioAndroid": true
            }
        ],
        [
            "expo-image-picker",
            {
                "photosPermission": "The app accesses your photos to let you share them with your friends."
            }
        ]
    ],
});