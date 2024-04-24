import {UserType} from "$lib/types";
import {checkApplicantInfoTableExists, checkUserTableExists} from "$lib/util";
import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;

    let user = null;
    let applicantInfoLength = 0;

    if (event.locals.user?.id != null) {
        if (event.locals.user?.type == UserType.Applicant) {
            await checkApplicantInfoTableExists(db);
            const applicantInfo = await db
                .prepare(
                    "SELECT user FROM applicantInfo WHERE user = ? LIMIT 1"
                )
                .bind(event.locals.user?.id as string)
                .all();
            applicantInfoLength = applicantInfo.results.length;
        }
    }

    return {
        user_type: event.locals.user?.type,
        types: UserType,
        applicantInfo: applicantInfoLength
    };
};
