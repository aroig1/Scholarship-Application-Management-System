import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {
    checkApplicationTableExists,
    checkUserTableExists,
    checkApplicantInfoTableExists
} from "$lib/util";
import {error, type Actions} from "@sveltejs/kit";
import {UserType} from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Administrator) {
        error(403);
    }

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
        .bind(event.params.userID, event.params.id)
        .all();

    return {
        applicant: result.results
    };
};

export const actions: Actions = {
    award: async ({params, locals, request, platform}) => {
        const db = platform?.env.DB as D1Database;

        await db
            .prepare(
                "UPDATE applications SET status = ? WHERE applicant = ? AND scholarship = ? LIMIT 1"
            )
            .bind("awarded", params.userID, params.id)
            .run();
    },
    reject: async ({params, locals, request, platform}) => {
        const db = platform?.env.DB as D1Database;

        await db
            .prepare(
                "UPDATE applications SET status = ? WHERE applicant = ? AND scholarship = ? LIMIT 1"
            )
            .bind("rejected", params.userID, params.id)
            .run();
    }
};
