import { redirect } from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;

    if (event.locals.user?.id == null) {
        redirect(302, "/loginPage");
    }

    return {
        scholarships: true
    };
};