import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {loadApplications, loadScholarship} from "$lib/util";
import {rankApplicants} from "$lib/matching";
import {UserType} from "$lib/types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Donor) {
        error(403, "You are not authorized to view this page");
    }

    const applications = await loadApplications(db, event.params.id);
    console.log(applications);
    const ranked = await rankApplicants(
        await loadScholarship(db, event.params.id),
        applications
    );
    console.log(ranked);
    return {
        applicants: ranked
    };
};
