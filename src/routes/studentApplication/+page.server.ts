// import {saveApplication} from '$lib/util.ts'
import type {Application} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({cookies, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;

        const application: Application = {
            applicant: data.get("applicant") as string, // not in form, loaded in from user data
            scholarship: data.get("scholarship") as string, // not in form, loaded in somehow
            statement: data.get("statement") as string
        };

        console.log(application)

        // saveApplication(db, application); // utils function

        return {
            success: true
        };
    }
};
