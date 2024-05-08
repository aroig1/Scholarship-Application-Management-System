import {redirect} from "@sveltejs/kit";

import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user?.id == null) {
        redirect(302, "/loginPage");
    }

    await event.locals.lucia.invalidateSession(event.locals.session?.id);
    redirect(302, "/loginPage");
};
