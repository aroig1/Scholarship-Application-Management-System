import {
    saveApplicantInfo,
    saveApplication,
    loadScholarship,
    updateApplication,
    checkApplicationTableExists
} from "$lib/util";
import {v4 as uuidv4} from "uuid";
import {
    type ApplicantInfo,
    type Application,
    type Ethnicity,
    type Major,
    type Minor,
    type StudentYear,
    type Scholarship,
    UserType
} from "$lib/types.js";

import {error, redirect, type Actions} from "@sveltejs/kit";
import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";

async function loadDBScholarship(id: string | undefined, db: D1Database) {
    return (await loadScholarship(
        db,
        id as string // id for testing: "6edf1e4c-2178-40a2-8825-7faadbb9f072"
    )) as Scholarship;
}

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Applicant) {
        error(403);
    }

    const scholarship = await loadDBScholarship(event.params.id, db);

    return {
        scholarship: scholarship
    };
};

export const actions: Actions = {
    default: async ({params, locals, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;

        await checkApplicationTableExists(db);
        const oldApp = await db
            .prepare(
                `SELECT * FROM applications 
            WHERE scholarship = ? AND applicant = ?`
            )
            .bind(params.id as string, locals.user?.id as string)
            .all();

        if (oldApp.results.length > 0) {
            const application: Application = {
                id: oldApp.results[0].id as string,
                applicant: locals.user?.id as string,
                scholarship: params.id as string,
                statement: data.get("statement") as string,
                status: "applied"
            };

            updateApplication(db, application);
        } else {
            const application: Application = {
                id: uuidv4(),
                applicant: locals.user?.id as string,
                scholarship: params.id as string,
                statement: data.get("statement") as string,
                status: "applied"
            };

            saveApplication(db, application);
        }

        redirect(302, "/studentViewScholarship");

        return {
            success: true
        };
    }
};
