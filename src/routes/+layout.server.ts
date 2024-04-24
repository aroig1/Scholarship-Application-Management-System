import {UserType} from "$lib/types";
import {checkUserTableExists} from "$lib/util";
import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";

export const load: PageServerLoad = async (event: any) => {
    const db = event.platform?.env.DB as D1Database;

    let user = null;
    let applicantInfoLength = 0;

    if (event.locals.user?.id != null) {
        await checkUserTableExists(db);
        user = await db
            .prepare("SELECT type FROM users WHERE id = ? LIMIT 1")
            .bind(event.locals.user?.id as string)
            .all();

        if (user.results[0].type == UserType.Applicant) {
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
        user_type: user?.results[0].type,
        types: UserType,
        applicantInfo: applicantInfoLength
    };
};
