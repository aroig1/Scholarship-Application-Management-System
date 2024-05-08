import {error} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user?.id == null) {
        error(403, "You are not authorized to view this page");
    }
};
