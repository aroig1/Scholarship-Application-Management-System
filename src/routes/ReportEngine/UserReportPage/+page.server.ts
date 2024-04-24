import {checkUserAccess} from "$lib/util";
import type {D1Database} from "@cloudflare/workers-types";
import type {PageServerLoad} from "./$types";
import {UserType} from "$lib/types";

export const load: PageServerLoad = async (event) => {
    await checkUserAccess(
        event.platform?.env.DB as D1Database,
        UserType.Administrator,
        event.locals.user?.id as string
    );
};
