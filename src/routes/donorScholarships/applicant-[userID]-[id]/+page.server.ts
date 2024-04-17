import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {
    checkApplicationTableExists,
    checkUserTableExists,
    checkApplicantInfoTableExists
} from "$lib/util";
import type {Actions} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params, platform}) => {
    const db = platform?.env.DB as D1Database;

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
        WHERE applications.applicant = ? AND applications.scholarship = ?
        LIMIT 1
    `
        )
        .bind(params.userID, params.id)
        .all();

    return {
        applicant: result.results
    };
};

export const actions: Actions = {
    default: async ({params, locals, request, platform}) => {
        const db = platform?.env.DB as D1Database;

        await db
            .prepare(
                "UPDATE applications SET status = ? WHERE applicant = ? AND scholarship = ? LIMIT 1"
            )
            .bind("suggested", params.userID, params.id)
            .run();
    }
};
