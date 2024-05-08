import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {loadScholarships} from "$lib/util";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Donor) {
        error(403, "You are not authorized to view this page");
    }

    const scholarships = await loadScholarships(db, event.locals.user?.id);

    return {
        scholarships: scholarships
    };
};
