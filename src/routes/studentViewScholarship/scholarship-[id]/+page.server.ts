import {loadScholarship} from "$lib/util";
import type {Scholarship} from "$lib/types.js";

import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";

async function loadDBScholarship(id: string | undefined, db: D1Database) {
    return (await loadScholarship(
        db,
        id as string // id for testing: "6edf1e4c-2178-40a2-8825-7faadbb9f072"
    )) as Scholarship;
}

export const load: PageServerLoad = async ({params, platform}) => {
    const db = platform?.env.DB as D1Database;
    const scholarship = await loadDBScholarship(params.id, db);

    return {
        scholarship: scholarship
    };
};
