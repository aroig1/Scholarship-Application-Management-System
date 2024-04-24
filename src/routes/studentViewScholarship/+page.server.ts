import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Applicant) {
        error(403);
    }

    await checkScholarshipTableExists(db);

    const scholarships = await db
        .prepare("SELECT * FROM scholarships WHERE archived = ?")
        .bind(false)
        .all();

    return {
        scholarships: scholarships.results
    };
};
