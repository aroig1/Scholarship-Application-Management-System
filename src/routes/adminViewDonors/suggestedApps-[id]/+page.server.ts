import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {
    checkApplicationTableExists,
    checkUserTableExists,
    checkApplicantInfoTableExists,
    checkUserAccess
} from "$lib/util";
import {UserType} from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    await checkUserAccess(
        db,
        UserType.Administrator,
        event.locals.user?.id as string
    );

    await checkApplicationTableExists(db);
    await checkUserTableExists(db);
    await checkApplicantInfoTableExists(db);

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
        .bind(event.params.id, "suggested")
        .all();

    return {
        applicants: result.results
    };
};
