import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;
    if (event.locals.user?.type != UserType.Administrator) {
        error(403, "You are not authorized to view this page");
    }
    await checkScholarshipTableExists(db);
    const donors = await db
        .prepare("SELECT * FROM users WHERE type = ?")
        .bind(UserType.Donor)
        .all();

    return {
        donors: donors.results
    };
};
