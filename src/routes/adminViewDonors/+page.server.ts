import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";
import { UserType } from "$lib/types";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;
    await checkScholarshipTableExists(db);
    const donors = await db
        .prepare("SELECT * FROM users WHERE type = ?")
        .bind(UserType.Donor)
        .all();

    return {
        donors: donors.results
    };
};
