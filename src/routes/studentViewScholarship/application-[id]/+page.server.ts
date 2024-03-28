import {saveApplicantInfo, saveApplication} from "$lib/util";
import {v4 as uuidv4} from "uuid";
import type {ApplicantInfo, Application, Ethnicity, Major, Minor, StudentYear} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";
import type {D1Database} from "@cloudflare/workers-types";

export const actions: Actions = {
    default: async ({params, locals, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;

        const application: Application = {
            id: uuidv4(),
            applicant: locals.user?.id as string, 
            scholarship: params.id as string, 
            statement: data.get("statement") as string
        };

        console.log(application)

        saveApplication(db, application);
        saveApplicantInfo(db, applicantInfo);

        return {
            success: true
        };
    }
};
