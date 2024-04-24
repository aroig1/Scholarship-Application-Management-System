import {loadScholarship} from "$lib/util";
import {UserType, type Scholarship} from "$lib/types.js";

import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {error} from "@sveltejs/kit";

async function loadDBScholarship(id: string | undefined, db: D1Database) {
    return (await loadScholarship(
        db,
        id as string // id for testing: "6edf1e4c-2178-40a2-8825-7faadbb9f072"
    )) as Scholarship;
}

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Applicant) {
        error(403);
    }

    const scholarship = await loadDBScholarship(event.params.id, db);

    return {
        scholarship: scholarship
    };
};
