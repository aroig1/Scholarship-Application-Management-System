import {saveApplication} from "$lib/util";
import {v4 as uuidv4} from "uuid";
import type {Application} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";
import type {D1Database} from "@cloudflare/workers-types";

export const actions: Actions = {
    default: async ({params, locals, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;

        const application: Application = {
            id: uuidv4(),
            applicant: locals.user?.id as string, // not in form, loaded in from user data (DORIAN's COOKIES)
            scholarship: params.scholarship as string, // not in form, loaded in somehow, changes based on dynamically loaded page
            statement: data.get("statement") as string
        };

        saveApplication(db, application);

        return {
            success: true
        };
    }
};