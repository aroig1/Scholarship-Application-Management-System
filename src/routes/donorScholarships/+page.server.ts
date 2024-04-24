import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {
    checkApplicationTableExists,
    checkScholarshipTableExists,
    checkUserAccess
} from "$lib/util";
import {UserType} from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    await checkUserAccess(db, UserType.Donor, event.locals.user?.id as string);

    await checkScholarshipTableExists(db);
    const nonArchived = await db
        .prepare(
            "SELECT * FROM scholarships WHERE donorID = ? AND archived = ?"
        )
        .bind(event.locals.user?.id, false)
        .all();

    const archived = await db
        .prepare(
            "SELECT * FROM scholarships WHERE donorID = ? AND archived = ?"
        )
        .bind(event.locals.user?.id, true)
        .all();

    return {
        archived_scholarships: archived.results,
        scholarships: nonArchived.results
    };
};
