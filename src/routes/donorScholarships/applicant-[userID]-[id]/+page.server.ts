import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {
    checkApplicationTableExists,
    checkUserTableExists,
    checkApplicantInfoTableExists
} from "$lib/util";
import {error, type Actions} from "@sveltejs/kit";
import {UserType, type Major, type Minor} from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Donor) {
        error(403, "You are not authorized to view this page");
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

    let applicant = result.results[0];

    if ("majors" in result.results[0]) {
        applicant.majors = JSON.parse(result.results[0].majors as string).map(
            (s: string) => s as Major
        );
    }
    if ("minors" in result.results[0]) {
        applicant.minors = JSON.parse(result.results[0].minors as string).map(
            (s: string) => s as Minor
        );
    }
    if ("workExperience" in result.results[0]) {
        applicant.workExperience = JSON.parse(
            result.results[0].workExperience as string
        ).map((s: string) => s as string);
    }

    return {
        applicant: applicant
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
