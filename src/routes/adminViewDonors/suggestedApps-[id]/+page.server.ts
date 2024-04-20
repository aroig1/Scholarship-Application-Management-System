import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {
    checkApplicationTableExists,
    checkUserTableExists,
    checkApplicantInfoTableExists
} from "$lib/util";

export const load: PageServerLoad = async ({params, platform}) => {
    const db = platform?.env.DB as D1Database;

    await checkApplicationTableExists(db);
    await checkUserTableExists(db);
    await checkApplicantInfoTableExists(db);

    // await db.prepare("DROP TABLE IF EXISTS applications").run();

    const result = await db
        .prepare(
            `
        SELECT *
        FROM applications
        JOIN applicantInfo ON applications.applicant = applicantInfo.user
        JOIN users ON applications.applicant = users.id
        WHERE applications.scholarship = ? AND applications.status = ?
    `
        )
        .bind(params.id, "suggested")
        .all();

    return {
        applicants: result.results
    };
};
