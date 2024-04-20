// See https://kit.svelte.dev/docs/types#app

import type {D1Database} from "@cloudflare/workers-types";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        interface Platform {
            env: {
                DB?: D1Database;
            };
            context: {
                waitUntil(promise: Promise<any>): void;
            };
            caches: CacheStorage & {default: Cache};
        }
        interface Locals {
            lucia: import("$lib/server/auth").Auth;
            user: import("lucia").User | null;
            session: import("lucia").Session | null;
        }
    }
    declare module "*.numbers" {
        const data: string;
        export default data;
    }
    declare module "*.xlsx" {
        const data: string;
        export default data;
    }
}

export {};
