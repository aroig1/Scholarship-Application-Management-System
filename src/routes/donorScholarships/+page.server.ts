import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {
    checkApplicationTableExists,
    checkScholarshipTableExists
} from "$lib/util";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Donor) {
        error(403, "You are not authorized to view this page");
    }

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
