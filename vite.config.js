import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig} from "vitest/config";
import {readFileSync} from "fs";

export default defineConfig({
    plugins: [
        sveltekit(),
        {
            name: "sheet-base64",
            transform(code, id) {
                if (!id.match(/\.(numbers|xlsx)$/)) return;
                let data = readFileSync(id, "base64");
                return `export default '${data}'`;
            }
        }
    ],
    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"]
    },
    assetsInclude: ["**/*.numbers", "**/*.xlsx"]
});
