import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "https://cs361-osupostbacc-song-trivia-microservice-ha9b.vercel.app",
                changeOrigin: true,
                rewrite: (path) => path,
            },
        },
    },
});
