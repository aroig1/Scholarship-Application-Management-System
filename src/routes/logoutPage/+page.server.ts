import {initializeLucia} from "$lib/server/auth";
import {fail, redirect} from "@sveltejs/kit";

import type {PageServerLoad, Actions} from "./$types";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user?.id == null) {
        redirect(302, "/login");
    }
    return {
        username: event.locals.user.id //TODO determine if this is supposed to be id or username
    };
};

export const actions: Actions = {
    default: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }

        await event.locals.lucia.invalidateSession(event.locals.session.id);

        await event.locals.lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = event.locals.lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        redirect(302, "/loginPage");
    }
};
