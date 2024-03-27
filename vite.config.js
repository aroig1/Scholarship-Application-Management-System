import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig} from "vitest/config";

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".node": "copy"
            }
        }
    },
    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"]
    }
});
