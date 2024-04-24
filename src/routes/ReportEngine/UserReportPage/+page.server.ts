import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    // @ts-ignore
    if (event.locals.user?.type != UserType.Administrator) {
        error(403);
    }
};
