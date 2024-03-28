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

        const applicantInfo: ApplicantInfo = {
            user: locals.user?.id as string,
            majors: JSON.parse(data.get("majors") as string).map((s: string) => s as Major),
            minors: JSON.parse(data.get("minors") as string).map((s: string) => s as Minor),
            GPA: Number(data.get("GPA") as string),
            year: data.get("year") as string as unknown as StudentYear,
            ethnicity: data.get("pronouns") as string as Ethnicity,
            preferredPronouns: data.get("pronouns") as string,
            workExperience: data.get("workExperience") as string,
            netID: "NETID"
        }

        saveApplication(db, application);
        saveApplicantInfo(db, applicantInfo);

        return {
            success: true
        };
    }
};
