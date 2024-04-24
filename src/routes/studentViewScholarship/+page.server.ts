import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists, checkUserAccess} from "$lib/util";
import {UserType} from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    await checkUserAccess(
        db,
        UserType.Applicant,
        event.locals.user?.id as string
    );
    await checkScholarshipTableExists(db);

    const scholarships = await db
        .prepare("SELECT * FROM scholarships WHERE archived = ?")
        .bind(false)
        .all();

    return {
        scholarships: scholarships.results
    };
};
