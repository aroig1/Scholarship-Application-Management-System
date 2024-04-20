import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    await checkScholarshipTableExists(db);
    const scholarships = await db
        .prepare("SELECT * FROM scholarships WHERE donorID = ?")
        .bind(event.params.donorID)
        .all();

    const donor = await db
        .prepare("SELECT firstName, lastName FROM users WHERE id = ? LIMIT 1")
        .bind(event.params.donorID)
        .all();

    return {
        scholarships: scholarships.results,
        donor: donor.results[0]
    };
};
