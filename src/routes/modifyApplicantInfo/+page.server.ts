import {
    checkApplicantInfoTableExists,
    loadApplicantInfo,
    updateApplicantInfo
} from "$lib/util";
import type {ApplicantInfo, Ethnicity, Major, Minor} from "$lib/types.js";
import type {PageServerLoad} from "./$types";
import {majors, minors, ethnicities, StudentYear} from "$lib/types.js";

import {redirect, type Actions} from "@sveltejs/kit";
import type {D1Database} from "@cloudflare/workers-types";

export const load: PageServerLoad = async ({locals, platform}) => {
    const db = platform?.env.DB as D1Database;

    await checkApplicantInfoTableExists(db);
    const applicantInfo = (await loadApplicantInfo(
        db,
        locals.user?.id as string
    )) as ApplicantInfo;

    return {
        majors: majors as unknown as Major[],
        minors: minors as unknown as Minor[],
        years: Object.values(StudentYear),
        ethnicities: ethnicities,
        applicantInfo: applicantInfo
    };
};

export const actions: Actions = {
    default: async ({locals, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;

        const applicantInfo: ApplicantInfo = {
            user: locals.user?.id as string,
            majors: JSON.parse(data.get("majors") as string).map(
                (s: string) => s as Major
            ),
            minors: JSON.parse(data.get("minors") as string).map(
                (s: string) => s as Minor
            ),
            GPA: Number(data.get("GPA") as string),
            year: data.get("year") as unknown as StudentYear,
            ethnicity: data.get("ethnicity") as string as Ethnicity,
            preferredPronouns: data.get("pronouns") as string,
            workExperience: (data.get("workExperience") as string).split(","),
            netID: data.get("netID") as string,
            studentID: data.get("studentID") as string
        };

        updateApplicantInfo(db, applicantInfo);

        return {
            success: true
        };
    }
};
