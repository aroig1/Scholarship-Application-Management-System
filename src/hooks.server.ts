import {initializeLucia} from "$lib/server/auth";
import type {Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";
import type {D1Database} from "@cloudflare/workers-types";

let env = {};

if (dev) {
    const {Miniflare} = await import("miniflare");

    const mf = new Miniflare({
        d1Databases: ["DB"],
        d1Persist: ".wrangler/state/v3/d1",
        modules: true,
        script: ""
    });
    env = await mf.getBindings();
}

// This function handles authentication and session management using Lucia framework.
// It checks for an existing session, validates it, and updates session cookies accordingly.
// This function is crucial for managing authentication and session handling within the application.
// It ensures that user sessions are validated and updated appropriately, providing secure access
// to protected resources while maintaining user privacy and security.
export const handle: Handle = async ({event, resolve}) => {
    if (dev) {
        // @ts-ignore
        event.platform = {
            ...event.platform,
            env
        };
    }
    //function returns a lucia type for authentication purposes.
    event.locals.lucia = initializeLucia(event.platform?.env.DB as D1Database);

    const sessionId = event.cookies.get(event.locals.lucia.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const {session, user} = await event.locals.lucia.validateSession(sessionId);
    if (session && session.fresh) {
        const sessionCookie = event.locals.lucia.createSessionCookie(
            session.id
        );
        // sveltekit types deviates from the de-facto standard
        // you can use 'as any' too
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }
    if (!session) {
        const sessionCookie = event.locals.lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }
    event.locals.user = user;
    event.locals.session = session;
    return resolve(event);
};
