import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";
import {loadScholarships, loadApplicantInfo} from "$lib/util";
import {rankScholarships} from "$lib/matching";

export const load: PageServerLoad = async ({locals, platform}) => {
    const db = platform?.env.DB as D1Database;

    // @ts-ignore
    if (locals.user?.type != UserType.Applicant) {
        error(403, "You are not authorized to view this page");
    }

    const scholarships = await loadScholarships(db);
    const applicantInfo = await loadApplicantInfo(
        db,
        locals.user?.id as string
    );

    const ranked = await rankScholarships(applicantInfo, scholarships);

    return {
        scholarships: ranked.filter((scholarship) => scholarship.score > 0)
    };
};
