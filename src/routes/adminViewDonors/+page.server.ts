import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";
import { UserType } from "$lib/types";

export const load: PageServerLoad = async ({locals, platform}) => {
    const db = platform?.env.DB as D1Database;
    await checkScholarshipTableExists(db);
    const donors = await db
        .prepare("SELECT * FROM users WHERE type = ?")
        .bind(UserType.Administrator)
        .all();

    return {
        donors: donors.results
    };
};
