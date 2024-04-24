import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;
    if (event.locals.user?.type != UserType.Administrator) {
        error(403);
    }
    await checkScholarshipTableExists(db);

    const nonArchived = await db
        .prepare(
            "SELECT * FROM scholarships WHERE donorID = ? AND archived = ?"
        )
        .bind(event.params.donorID, false)
        .all();

    const archived = await db
        .prepare(
            "SELECT * FROM scholarships WHERE donorID = ? AND archived = ?"
        )
        .bind(event.params.donorID, true)
        .all();

    const donor = await db
        .prepare("SELECT firstName, lastName FROM users WHERE id = ? LIMIT 1")
        .bind(event.params.donorID)
        .all();

    return {
        scholarships: nonArchived.results,
        archived: archived.results,
        donor: donor.results[0]
    };
};
