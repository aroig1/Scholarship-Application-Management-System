import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {
    checkApplicationTableExists,
    checkScholarshipTableExists
} from "$lib/util";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Applicant) {
        error(403, "You are not authorized to view this page");
    }

    await checkApplicationTableExists(db);
    await checkScholarshipTableExists(db);

    const result = await db
        .prepare(
            `
        SELECT *
        FROM applications
        JOIN scholarships ON applications.scholarship = scholarships.id
        WHERE applications.applicant = ?
    `
        )
        .bind(event.locals.user?.id)
        .all();

    return {
        applications: result.results
    };
};
