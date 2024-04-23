import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";

export const load: PageServerLoad = async ({locals, platform}) => {
    const db = platform?.env.DB as D1Database;
    await checkScholarshipTableExists(db);
    const nonArchived = await db
        .prepare("SELECT * FROM scholarships WHERE donorID = ? AND archived = ?")
        .bind(locals.user?.id, false)
        .all();

    const archived = await db
        .prepare("SELECT * FROM scholarships WHERE donorID = ? AND archived = ?")
        .bind(locals.user?.id, true)
        .all();

    return {
        archived_scholarships: archived.results,
        scholarships: nonArchived.results
    };
};
