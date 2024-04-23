import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists, checkUserAccess} from "$lib/util";
import { UserType } from "$lib/types";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;
    await checkUserAccess(db, UserType.Administrator, event.locals.user?.id as string);
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
