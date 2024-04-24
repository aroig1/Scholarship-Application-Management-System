import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
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
